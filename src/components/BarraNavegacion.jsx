
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function BarraNavegacion() {

    const { autenticado, usuario, logout } = useAuth();

    const linkClass = ({ isActive }) =>
        `font-medium ${isActive ? "text-primary" : "hover:text-primary"}`;

    return (
        <div className="navbar bg-base-100 shadow-md px-4">

            <div className="navbar-start">

                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7"
                            />
                        </svg>
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg"
                    >
                        <li>
                            <NavLink to="/">Inicio</NavLink>
                        </li>

                        <li>
                            <NavLink to="/heroes">Héroes</NavLink>
                        </li>

                        {autenticado && (
                            <li>
                                <NavLink to="/favoritos">Mis favoritos</NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Logo */}
            <div className="navbar-center">
                <Link
                    to="/"
                    className="btn btn-ghost text-xl font-bold"
                >
                    SUPERHEROES
                </Link>
            </div>

            {/* Usuario */}
            <div className="navbar-end gap-2">

                {autenticado ? (
                    <div className="dropdown dropdown-end">

                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Avatar de usuario"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                />
                            </div>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg"
                        >
                            <li className="menu-title">
                                Hola, {usuario.nombre}
                            </li>

                            <li>
                                <NavLink to="/favoritos">
                                    Mis favoritos
                                </NavLink>
                            </li>

                            <li>
                                <button
                                    onClick={logout}
                                    className="text-error"
                                >
                                    Cerrar sesión
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="btn btn-primary btn-sm"
                    >
                        Iniciar sesión
                    </Link>
                )}

            </div>
        </div>
    );
}
