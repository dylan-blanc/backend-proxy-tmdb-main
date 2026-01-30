import express from "express";
import cors from "cors";
import { fetchTMDB, handleError } from "./hook/fetchTMDB.js";

const app = express();

app.use(cors());

// Films populaires
app.get("/api/tmdb/movies/popular", async (req, res) => {
    try {
        const page = req.query.page || 1;
        res.json(await fetchTMDB(`/movie/popular?language=fr-FR&page=${page}`));
    } catch (error) {
        handleError(res, error);
    }
});

// Genres de films
app.get("/api/tmdb/genre/movie/list", async (req, res) => {
    try {
        res.json(await fetchTMDB("/genre/movie/list?language=fr-FR"));
    } catch (error) {
        handleError(res, error);
    }
});

// Discover movies avec filtres (genre, tri, ordre)
app.get("/api/tmdb/discover/movie", async (req, res) => {
    try {
        const { sort_by = 'popularity', order = 'desc', with_genres, page = 1 } = req.query;
        let endpoint = `/discover/movie?language=fr-FR&page=${page}&sort_by=${sort_by}.${order}`;
        
        if (with_genres) {
            endpoint += `&with_genres=${with_genres}`;
        }
        if (sort_by === 'vote_average') {
            endpoint += `&vote_count.gte=1000`;
        }
        
        res.json(await fetchTMDB(endpoint));
    } catch (error) {
        handleError(res, error);
    }
});

// Genres de séries TV
app.get("/api/tmdb/genre/tv/list", async (req, res) => {
    try {
        res.json(await fetchTMDB("/genre/tv/list?language=fr-FR"));
    } catch (error) {
        handleError(res, error);
    }
});

// Discover TV shows avec filtres (genre, tri, ordre)
app.get("/api/tmdb/discover/tv", async (req, res) => {
    try {
        const { sort_by = 'popularity', order = 'desc', with_genres, page = 1 } = req.query;
        let endpoint = `/discover/tv?language=fr-FR&page=${page}&sort_by=${sort_by}.${order}`;
        
        if (with_genres) {
            endpoint += `&with_genres=${with_genres}`;
        }
        if (sort_by === 'vote_average') {
            endpoint += `&vote_count.gte=1000`;
        }
        
        res.json(await fetchTMDB(endpoint));
    } catch (error) {
        handleError(res, error);
    }
});

app.listen(3500, () => {
    console.log("Server démarrer sur le port http://localhost:3500");
});
