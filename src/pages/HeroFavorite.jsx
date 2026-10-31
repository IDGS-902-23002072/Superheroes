
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HeroFavorite() {

    // Recuperar favoritos del almacenamiento local
    const [favorites, setFavorites] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("favorites")) || [];
        } catch {
            return [];
        }
    });

    // Guardar cambios en localStorage
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    // Eliminar personaje de favoritos
    const removeFavorite = (id) => {
        setFavorites((prevFavorites) =>
            prevFavorites.filter((hero) => hero.id !== id)
        );
    };

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

    return (
        <div className="container mx-auto p-6">

            <h1 className="text-4xl font-extrabold text-center mb-3">
                Mis Favoritos
            </h1>

            <p className="text-center opacity-60 mb-10">
                Tus superhéroes favoritos en un solo lugar.
            </p>

            {favorites.length === 0 ? (

                <div className="text-center py-20">

                    <div className="text-6xl mb-4">
                        ♡
                    </div>

                    <h2 className="text-2xl font-bold mb-2">
                        No tienes favoritos todavía
                    </h2>

                    <p className="opacity-60 mb-6">
                        Explora el catálogo y agrega tus superhéroes favoritos.
                    </p>

                    <Link to="/heroes" className="btn btn-primary">
                        Explorar héroes
                    </Link>

                </div>

            ) : (

                <>
                    <div className="flex justify-between items-center mb-6">
                        <span className="font-semibold">
                            {favorites.length} personaje(s) guardado(s)
                        </span>

                        <button
                            className="btn btn-outline btn-error btn-sm"
                            onClick={() => setFavorites([])}
                        >
                            Eliminar todos
                        </button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-10">

                        {favorites.map((hero) => (

                            <div
                                key={hero.id}
                                className="flex flex-col items-center gap-4"
                            >

                                {/* Tarjeta 3D DaisyUI */}
                                <div className="hover-3d">

                                    <figure className="w-60 rounded-2xl overflow-hidden shadow-xl relative">

                                        <img
                                            src={hero.image?.url}
                                            alt={hero.name}
                                            className="w-full h-80 object-cover object-top"
                                        />

                                        {/* Identificador */}
                                        <span className="absolute top-3 left-3 badge badge-neutral font-bold">
                                            #{hero.id}
                                        </span>

                                        {/* Alineación */}
                                        <span className={`absolute top-3 right-3 badge ${getAlignmentBadge(hero.biography?.alignment)} uppercase`}>
                                            {hero.biography?.alignment || "neutral"}
                                        </span>

                                        {/* Nombre */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/75 text-white p-3">
                                            <h2 className="text-xl font-bold">
                                                {hero.name}
                                            </h2>

                                            {hero.biography?.["full-name"] && (
                                                <p className="text-sm opacity-80">
                                                    {hero.biography["full-name"]}
                                                </p>
                                            )}
                                        </div>

                                    </figure>

                                    {/* Elementos necesarios para efecto 3D */}
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>

                                </div>

                                {/* Acciones fuera del efecto 3D */}
                                <div className="flex flex-col gap-2 w-60">

                                    <Link
                                        to={`/heroes/${hero.id}`}
                                        className="btn btn-primary btn-sm w-full"
                                    >
                                        Ver detalles
                                    </Link>

                                    <button
                                        className="btn btn-outline btn-error btn-sm w-full"
                                        onClick={() => removeFavorite(hero.id)}
                                    >
                                        ♥ Quitar de favoritos
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>
                </>

            )}

        </div>
    );
}
