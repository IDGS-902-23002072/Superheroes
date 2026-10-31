import { use, useEffect, useState } from "react";
import env from "../environments/env";

// Total de heroes es de 731
const API_URL = `${env.API_URL}${env.ACCESS_TOKEN}`;

export function useHeroes(id) {
  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    async function loadHeroes() {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadHeroes();
    return () => controller.abort();
  }, [id]);

  return { character, loading, error };
}
