
import { Link } from "react-router-dom";

export default function Inicio() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950">

            {/* Imagen de fondo */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=2000')"
                }}
            />

            {/* Oscurecer fondo */}
            <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/90 to-slate-950/50" />

            {/* Contenido */}
            <div className="relative z-10 flex min-h-screen items-center px-6 md:px-16 lg:px-24">

                <div className="max-w-3xl">

                    <div className="mb-6 flex items-center gap-3">
                        <span className="h-1 w-12 bg-red-600"></span>
                        <span className="font-bold uppercase tracking-[0.3em] text-red-500">
                            Universo de superhéroes
                        </span>
                    </div>

                    <h1 className="mb-6 text-5xl font-black uppercase leading-tight text-white md:text-7xl">
                        Descubre a los
                        <span className="block text-red-600">
                            más poderosos
                        </span>
                    </h1>

                    <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl">
                        Explora un universo lleno de héroes y villanos.
                        Descubre sus habilidades, estadísticas, historias
                        y crea tu propia colección de personajes favoritos.
                    </p>

                    <div className="flex flex-wrap gap-4">

                        <Link
                            to="/heroes"
                            className="btn btn-error btn-lg rounded-lg px-8 text-white shadow-lg shadow-red-900/30"
                        >
                            <span>Explorar héroes</span>
                            <span className="text-xl">→</span>
                        </Link>

                        <Link
                            to="/favoritos"
                            className="btn btn-outline btn-lg rounded-lg border-white/40 px-8 text-white hover:border-white hover:bg-white hover:text-slate-950"
                        >
                            Mis favoritos
                        </Link>

                    </div>

                    {/* Características */}
                    <div className="mt-16 grid max-w-xl grid-cols-3 gap-6 border-t border-white/20 pt-8">

                        <div>
                            <p className="text-3xl font-black text-white">01</p>
                            <p className="mt-1 text-sm text-slate-400">
                                Explora héroes
                            </p>
                        </div>

                        <div>
                            <p className="text-3xl font-black text-white">02</p>
                            <p className="mt-1 text-sm text-slate-400">
                                Conoce sus poderes
                            </p>
                        </div>

                        <div>
                            <p className="text-3xl font-black text-white">03</p>
                            <p className="mt-1 text-sm text-slate-400">
                                Crea favoritos
                            </p>
                        </div>

                    </div>

                </div>
            </div>

            {/* Decoración */}
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-red-600/20 blur-3xl"></div>

        </div>
    );
}
