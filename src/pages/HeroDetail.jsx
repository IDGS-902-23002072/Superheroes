
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import env from "../environments/env";

const API_URL = `${env.API_URL}${env.ACCESS_TOKEN}`;

export default function HeroDetail() {

    const { id } = useParams();

    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Recuperar favoritos
    const [favorites, setFavorites] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("favorites")) || [];
        } catch {
            return [];
        }
    });

    // Consultar información del superhéroe
    useEffect(() => {

        const loadHero = async () => {

            try {

                setLoading(true);
                setError(null);

                const response = await fetch(`${API_URL}/${id}`);

                if (!response.ok) {
                    throw new Error("No se pudo consultar el superhéroe.");
                }

                const data = await response.json();

                if (data.response !== "success") {
                    throw new Error("No se encontró el superhéroe.");
                }

                setHero(data);

            } catch (err) {

                setError(err.message);

            } finally {

                setLoading(false);
            }
        };

        loadHero();

    }, [id]);

    // Guardar favoritos cuando cambien
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    // Comprobar si es favorito
    const isFavorite = favorites.some(
        (favorite) => String(favorite.id) === String(id)
    );

    // Agregar o quitar favoritos
    const toggleFavorite = () => {

        setFavorites((prevFavorites) => {

            const alreadyFavorite = prevFavorites.some(
                (favorite) => String(favorite.id) === String(id)
            );

            if (alreadyFavorite) {
                return prevFavorites.filter(
                    (favorite) => String(favorite.id) !== String(id)
                );
            }

            return [...prevFavorites, hero];
        });
    };

    // Colores de alineación
    const getAlignmentBadge = (alignment) => {

        switch (alignment?.toLowerCase()) {

            case "good":
                return "badge-success";

            case "bad":
                return "badge-error";

            default:
                return "badge-warning";
        }
    };

    // Pantalla de carga
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <span className="ml-3 text-lg font-semibold">
                    Cargando información del héroe...
                </span>
            </div>
        );
    }

    // Pantalla de error
    if (error || !hero) {
        return (
            <div className="text-center py-20">

                <h2 className="text-3xl font-bold mb-3">
                    ¡Héroe no encontrado!
                </h2>

                <p className="opacity-60 mb-6">
                    {error || "No existe información para este personaje."}
                </p>

                <Link to="/heroes" className="btn btn-primary">
                    Volver al catálogo
                </Link>

            </div>
        );
    }

    return (

        <div className="container mx-auto p-4 md:p-8">

            {/* Navegación */}
            <div className="mb-6">

                <Link
                    to="/heroes"
                    className="btn btn-ghost btn-sm"
                >
                    ← Volver al catálogo
                </Link>

            </div>

            {/* Encabezado */}
            <div className="text-center mb-10">

                <div className="flex justify-center gap-2 mb-3">

                    <span className="badge badge-neutral font-bold">
                        #{hero.id}
                    </span>

                    <span className={`badge ${getAlignmentBadge(hero.biography?.alignment)} uppercase`}>
                        {hero.biography?.alignment || "Neutral"}
                    </span>

                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold">
                    {hero.name}
                </h1>

                {hero.biography?.["full-name"] && (
                    <p className="text-lg opacity-60 mt-2">
                        {hero.biography["full-name"]}
                    </p>
                )}

            </div>

            {/* Información principal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                {/* Imagen */}
                <div className="flex flex-col items-center gap-5">

                    <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl bg-base-200">

                        <img
                            src={hero.image?.url}
                            alt={hero.name}
                            className="w-full max-h-162.5 object-cover object-top"
                        />

                    </div>

                    {/* Botón de favoritos */}
                    <button
                        onClick={toggleFavorite}
                        className={`btn w-full max-w-lg ${
                            isFavorite
                                ? "btn-error"
                                : "btn-outline btn-primary"
                        }`}
                    >

                        {isFavorite
                            ? "♥ Quitar de favoritos"
                            : "♡ Agregar a favoritos"
                        }

                    </button>

                </div>

                {/* Powerstats */}
                <div className="card bg-base-100 shadow-xl border border-base-300">

                    <div className="card-body">

                        <h2 className="card-title text-2xl mb-4">
                            Estadísticas de poder
                        </h2>

                        <div className="space-y-5">

                            {Object.entries(hero.powerstats || {}).map(
                                ([stat, value]) => {

                                    const numValue = parseInt(value) || 0;

                                    return (

                                        <div key={stat}>

                                            <div className="flex justify-between mb-1">

                                                <span className="capitalize font-semibold">
                                                    {stat}
                                                </span>

                                                <span className="font-bold text-primary">
                                                    {value}
                                                </span>

                                            </div>

                                            <progress
                                                className="progress progress-primary w-full h-3"
                                                value={numValue}
                                                max="100"
                                            />

                                        </div>

                                    );
                                }
                            )}

                        </div>

                    </div>

                </div>

            </div>

            {/* Biografía */}
            <section className="mt-12">

                <h2 className="text-3xl font-bold mb-6">
                    Biografía
                </h2>

                <div className="card bg-base-100 shadow-lg border border-base-300">

                    <div className="card-body">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <InfoItem
                                label="Nombre completo"
                                value={hero.biography?.["full-name"]}
                            />

                            <InfoItem
                                label="Editorial"
                                value={hero.biography?.publisher}
                            />

                            <InfoItem
                                label="Lugar de nacimiento"
                                value={hero.biography?.["place-of-birth"]}
                            />

                            <InfoItem
                                label="Primera aparición"
                                value={hero.biography?.["first-appearance"]}
                            />

                            <InfoItem
                                label="Alineación"
                                value={hero.biography?.alignment}
                            />

                            <InfoItem
                                label="Alter Ego"
                                value={hero.biography?.["alter-egos"]}
                            />

                        </div>

                        {/* Alias */}
                        {hero.biography?.aliases?.length > 0 &&
                            hero.biography.aliases[0] !== "-" && (

                            <div className="mt-5">

                                <h3 className="font-bold text-sm uppercase opacity-60 mb-2">
                                    Alias
                                </h3>

                                <div className="flex flex-wrap gap-2">

                                    {hero.biography.aliases.map((alias, index) => (

                                        <span
                                            key={index}
                                            className="badge badge-primary badge-outline p-3"
                                        >
                                            {alias}
                                        </span>

                                    ))}

                                </div>

                            </div>
                        )}

                    </div>

                </div>

            </section>

            {/* Apariencia */}
            <section className="mt-12">

                <h2 className="text-3xl font-bold mb-6">
                    Apariencia física
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

                    <AppearanceItem
                        label="Género"
                        value={hero.appearance?.gender}
                    />

                    <AppearanceItem
                        label="Raza"
                        value={hero.appearance?.race}
                    />

                    <AppearanceItem
                        label="Color de ojos"
                        value={hero.appearance?.["eye-color"]}
                    />

                    <AppearanceItem
                        label="Color de cabello"
                        value={hero.appearance?.["hair-color"]}
                    />

                    <AppearanceItem
                        label="Altura"
                        value={hero.appearance?.height?.[1]}
                    />

                    <AppearanceItem
                        label="Peso"
                        value={hero.appearance?.weight?.[1]}
                    />

                </div>

            </section>

            {/* Trabajo */}
            <section className="mt-12">

                <h2 className="text-3xl font-bold mb-6">
                    Trabajo y ocupación
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <InfoCard
                        title="Ocupación"
                        value={hero.work?.occupation}
                    />

                    <InfoCard
                        title="Base de operaciones"
                        value={hero.work?.base}
                    />

                </div>

            </section>

            {/* Conexiones */}
            <section className="mt-12 mb-10">

                <h2 className="text-3xl font-bold mb-6">
                    Conexiones
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <InfoCard
                        title="Afiliaciones grupales"
                        value={hero.connections?.["group-affiliation"]}
                    />

                    <InfoCard
                        title="Familiares"
                        value={hero.connections?.relatives}
                    />

                </div>

            </section>

        </div>

    );
}


// Componente para mostrar información
function InfoItem({ label, value }) {

    return (
        <div>
            <span className="text-xs font-bold uppercase opacity-50">
                {label}
            </span>

            <p className="font-medium mt-1">
                {value && value !== "-" ? value : "No disponible"}
            </p>
        </div>
    );
}


// Componente para apariencia física
function AppearanceItem({ label, value }) {

    return (
        <div className="bg-base-100 border border-base-300 rounded-xl p-4 text-center shadow-sm">

            <p className="text-xs font-bold uppercase opacity-50 mb-2">
                {label}
            </p>

            <p className="font-semibold capitalize">
                {value && value !== "-" ? value : "N/A"}
            </p>

        </div>
    );
}


// Componente para tarjetas informativas
function InfoCard({ title, value }) {

    return (
        <div className="card bg-base-100 border border-base-300 shadow-md">

            <div className="card-body">

                <h3 className="font-bold text-lg">
                    {title}
                </h3>

                <p className="text-sm opacity-70 whitespace-pre-line">
                    {value && value !== "-" ? value : "No disponible"}
                </p>

            </div>

        </div>
    );
}
