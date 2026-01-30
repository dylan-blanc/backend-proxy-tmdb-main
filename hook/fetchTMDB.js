import "dotenv/config";

const BASE_URL = process.env.BASE_URL;
const API_TOKEN = process.env.API_TOKEN;

/**
 * Effectue une requête vers l'API TMDB
 * @param {string} endpoint - L'endpoint TMDB (ex: "/movie/popular?language=fr-FR")
 * @returns {Promise<object>} - Les données JSON de la réponse
 */
export async function fetchTMDB(endpoint) {
    const url = new URL(`${BASE_URL}${endpoint}`);
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            accept: "application/json",
        },
    });
    if (!response.ok) throw new Error("Erreur TMDB");
    return response.json();
}

/**
 * Gère les erreurs et envoie une réponse d'erreur standardisée
 * @param {object} res - L'objet response Express
 * @param {Error} error - L'erreur capturée
 */
export function handleError(res, error) {
    console.log(error);
    return res.status(500).json({ 
        error: "erreur proxy TMDB", 
        message: error.message 
    });
}
