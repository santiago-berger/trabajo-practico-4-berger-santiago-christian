import { Router } from "express";
import {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
} from "../controllers/movie.controllers.js";

export const movieRouter = Router();

movieRouter.get("/movies", getAllMovies); // GET /api/movies
movieRouter.get("/movies/:id", getMovieById); // GET /api/movies/:id
movieRouter.post("/movies", createMovie); // POST /api/movies
movieRouter.put("/movies/:id", updateMovie); // PUT /api/movies/:id
movieRouter.delete("/movies/:id", deleteMovie); // DELETE /api/movies/:id