
import { createContext, useContext, useReducer, useEffect } from "react";

const obtenerEstadoInicial = () => {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (usuarioGuardado) {
        try {
            return {
                usuario: JSON.parse(usuarioGuardado),
                autenticado: true,
            };
        } catch {
            localStorage.removeItem("usuario");
        }
    }

    return {
        usuario: null,
        autenticado: false,
    };
};

// Reducer
function authReducer(estado, accion) {
    switch (accion.type) {
        case "LOGIN":
            return {
                usuario: accion.payload,
                autenticado: true,
            };

        case "LOGOUT":
            return {
                usuario: null,
                autenticado: false,
            };

        default:
            return estado;
    }
}

// Contexto global
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [estado, dispatch] = useReducer(
        authReducer,
        undefined,
        obtenerEstadoInicial
    );

    const login = (usuario) => {
        dispatch({
            type: "LOGIN",
            payload: usuario,
        });
    };

    const logout = () => {
        dispatch({ type: "LOGOUT" });
    };

    // Guardar o eliminar la sesión cada vez que cambie el usuario
    useEffect(() => {
        if (estado.autenticado && estado.usuario) {
            localStorage.setItem(
                "usuario",
                JSON.stringify(estado.usuario)
            );
        } else {
            localStorage.removeItem("usuario");
        }
    }, [estado]);

    return (
        <AuthContext.Provider
            value={{
                ...estado,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
