
import { Routes, Route } from "react-router-dom";

import "./App.css";

import NavBar from "./components/NavBar";

import Inicio from "./pages/Inicio";
import HeroesList from "./pages/HeroesList";
import HeroDetail from "./pages/HeroDetail";
import HeroFavorite from "./pages/HeroFavorite";
import Login from "./pages/Login";

import RutaPrivada from "./auth/RutaPrivada";
import NotFound from "./pages/NotFound";

function App() {

    return (
        <div className="min-h-screen bg-base-200">

            {/* Navegación principal */}
            <NavBar />

            {/* Contenido de las páginas */}
            <main className="container mx-auto px-4 py-6">

                <Routes>

                    {/* Página principal */}
                    <Route
                        path="/"
                        element={<Inicio />}
                    />

                    {/* Listado de superhéroes */}
                    <Route
                        path="/heroes"
                        element={
                        <RutaPrivada>
                          <HeroesList />
                        </RutaPrivada>
                      }
                    />

                    {/* Detalle de un superhéroe */}
                    <Route
                        path="/heroes/:id"
                        element={
                          <RutaPrivada>
                            <HeroDetail />
                          </RutaPrivada>
                      }
                    />

                    {/* Inicio de sesión */}
                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    {/* Superhéroes favoritos */}
                    <Route
                        path="/favoritos"
                        element={
                            <RutaPrivada>
                                <HeroFavorite />
                            </RutaPrivada>
                        }
                    />

                    {/* Ruta no encontrada */}
                    <Route
                        path="*"
                        element={
                            <NotFound />
                        }
                    />

                </Routes>

            </main>
        </div>
    );
}

export default App;
