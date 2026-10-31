
import { useState, useEffect } from "react";
import HeroCard from "../components/HeroCard";
import env from "../environments/env";

const API_URL = `${env.API_URL}${env.ACCESS_TOKEN}`;

export default function HeroesList() {

    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [favorites, setFavorites] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("favorites")) || [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (hero) => {

        setFavorites((prevFavorites) => {

            const alreadyFavorite = prevFavorites.some(
                (favorite) => favorite.id === hero.id
            );

            if (alreadyFavorite) {
                return prevFavorites.filter(
                    (favorite) => favorite.id !== hero.id
                );
            }

            return [...prevFavorites, hero];
        });
    };

    useEffect(() => {

        async function loadMultipleHeroes() {

            try {

                const ids = Array.from(
                    { length: 15 },
                    (_, i) => i + 1
                );

                const promises = ids.map(async (id) => {

                    const res = await fetch(`${API_URL}/${id}`);
                    const data = await res.json();

                    return data.response === "success" ? data : null;
                });

                const results = await Promise.all(promises);

                setHeroes(results.filter(Boolean));

            } catch (err) {

                setError(err.message);

            } finally {

                setLoading(false);
            }
        }

        loadMultipleHeroes();

    }, []);

    if (loading) {
        return (
            <div className="text-center p-10 text-xl">
                Cargando catálogo...
            </div>
        );
    }

    if (error) {
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">

                {heroes.map((hero) => (

                    <HeroCard
                        key={hero.id}
                        {...hero}
                        isFavorite={favorites.some(
                            (favorite) => favorite.id === hero.id
                        )}
                        onToggleFavorite={() => toggleFavorite(hero)}
                    />

                ))}

            </div>
        </div>
    );
}
