import { Router } from "express";
import {
  getAllMovies,
  getMovieById,
} from "../controllers/movie.controllers.js";

export const movieRouter = Router();

movieRouter.get("/movies", getAllMovies); // GET /api/movies
movieRouter.get("/movies/:id", getMovieById); // GET /api/movies/:id