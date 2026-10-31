
import { useState, useEffect } from "react";
import HeroCard from "../components/HeroCard";
import env from "../environments/env";

const API_URL = `${env.API_URL}${env.ACCESS_TOKEN}`;

const IDS_HEROES = Array.from(
    { length: 15 },
    (_, i) => i + 1
);

const obtenerHeroesGuardados = () => {
    try {
        const guardados = JSON.parse(localStorage.getItem("heroes")) || [];

        return IDS_HEROES
            .map(id => guardados.find(hero => String(hero.id) === String(id)))
            .filter(Boolean);

    } catch {
        return [];
    }
};

export default function HeroesList() {

    const [heroes, setHeroes] = useState(obtenerHeroesGuardados);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Favoritos
    const [favorites, setFavorites] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("favorites")) || [];
        } catch {
            return [];
        }
    });

    // Guardar favoritos
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    // Agregar o quitar favoritos
    const toggleFavorite = (hero) => {

        setFavorites((prevFavorites) => {

            const alreadyFavorite = prevFavorites.some(
                favorite => favorite.id === hero.id
            );

            if (alreadyFavorite) {
                return prevFavorites.filter(
                    favorite => favorite.id !== hero.id
                );
            }

            return [...prevFavorites, hero];
        });
    };

    // Cargar héroes desde caché o API
    useEffect(() => {

        const controller = new AbortController();

        async function loadMultipleHeroes() {

            try {

                const heroesGuardados = obtenerHeroesGuardados();

                const idsGuardados = heroesGuardados.map(
                    hero => Number(hero.id)
                );

                const idsFaltantes = IDS_HEROES.filter(
                    id => !idsGuardados.includes(id)
                );

                if (idsFaltantes.length === 0) {
                    setLoading(false);
                    return;
                }

                const promises = idsFaltantes.map(async (id) => {

                    try {

                        const res = await fetch(
                            `${API_URL}/${id}`,
                            { signal: controller.signal }
                        );

                        if (!res.ok) {
                            return null;
                        }

                        const data = await res.json();

                        return data.response === "success" ? data : null;

                    } catch (err) {

                        if (err.name === "AbortError") {
                            return null;
                        }

                        return null;
                    }
                });

                const results = await Promise.all(promises);

                const nuevosHeroes = results.filter(Boolean);

                const heroesCompletos = [
                    ...heroesGuardados,
                    ...nuevosHeroes
                ];

                heroesCompletos.sort(
                    (a, b) => Number(a.id) - Number(b.id)
                );

                if (!controller.signal.aborted) {

                    setHeroes(heroesCompletos);

                    if (nuevosHeroes.length > 0) {
                        localStorage.setItem(
                            "heroes",
                            JSON.stringify(heroesCompletos)
                        );
                    }

                    if (heroesCompletos.length < 15) {
                        setError(
                            `Se cargaron ${heroesCompletos.length} de 15 héroes. Se intentará completar el catálogo en tu próxima visita.`
                        );
                    }
                }

            } catch (err) {

                if (!controller.signal.aborted) {
                    setError("No se pudo cargar el catálogo.");
                }

            } finally {

                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadMultipleHeroes();

        return () => {
            controller.abort();
        };

    }, []);

    // Mostrar carga únicamente cuando no tenemos ningún héroe
    if (loading && heroes.length === 0) {
        return (
            <div className="text-center p-10 text-xl">
                Cargando catálogo...
            </div>
        );
    }

    if (error && heroes.length === 0) {
        return (
            <div className="text-center p-10 text-error">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">

            <h1 className="text-4xl font-extrabold mb-8 text-center">
                Catálogo de Superhéroes
            </h1>

            {error && (
                <div className="alert alert-warning mb-6">
                    <span>{error}</span>
                </div>
            )}

            {loading && heroes.length > 0 && (
                <p className="text-center mb-6">
                    Completando catálogo...
                </p>
            )}

            <p className="text-center text-sm opacity-60 mb-6">
                {heroes.length} de 15 héroes disponibles
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">

                {heroes.map((hero) => (

                    <HeroCard
                        key={hero.id}
                        {...hero}
                        isFavorite={favorites.some(
                            favorite => favorite.id === hero.id
                        )}
                        onToggleFavorite={() => toggleFavorite(hero)}
                    />

                ))}

            </div>
        </div>
    );
}
