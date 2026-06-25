import { Movie } from "../models/movie.model.js";

// GET /api/movies de todas las peliculas
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// GET /api/movies/:id de una pelicula por su id
export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);

    if (!movie) {
      return res
        .status(404)
        .json({ message: `No existe una película con el id ${id}.` });
    }

    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};