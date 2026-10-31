
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import env from "../environments/env";

export default function Login() {
    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const USUARIO = {
        nombre: env.USER,
        password: env.PASSWORD,
    };

    const enviar = (e) => {
        e.preventDefault();

        if (!nombre.trim() || !password.trim()) {
            setError("Completa todos los campos");
            return;
        }

        if (
            nombre === USUARIO.nombre &&
            password === USUARIO.password
        ) {
            login({
                nombre: USUARIO.nombre,
            });

            navigate("/heroes", { replace: true });
        } else {
            setError("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">
                        ¡Bienvenido!
                    </h1>

                    <p className="py-6">
                        Inicia sesión para explorar tus superhéroes
                        favoritos y administrar tu colección.
                    </p>
                </div>

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">

                        <form onSubmit={enviar}>
                            <fieldset className="fieldset">

                                <label className="label">
                                    Usuario
                                </label>

                                <input
                                    type="text"
                                    className="input w-full"
                                    placeholder="admin"
                                    value={nombre}
                                    onChange={(e) => {
                                        setNombre(e.target.value);
                                        setError("");
                                    }}
                                />

                                <label className="label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    className="input w-full"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError("");
                                    }}
                                />

                                {error && (
                                    <p className="text-error text-sm mt-2">
                                        {error}
                                    </p>
                                )}

                                <button
                                    className="btn btn-neutral mt-4"
                                    type="submit"
                                >
                                    Iniciar sesión
                                </button>

                            </fieldset>
                        </form>

                    </div>
                </div>

            </div>
        </div>
    );
}
