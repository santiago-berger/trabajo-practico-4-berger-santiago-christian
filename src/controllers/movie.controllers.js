import { Op } from "sequelize";
import { Movie } from "../models/movie.model.js";

// año actual se usa como limite superior para validar year
const CURRENT_YEAR = new Date().getFullYear();

/**
 * valida los datos de una pelicula
 * devuelve un string con el mensaje de error si algo esta mal
 * devuelve null si esta todo bien
 */
const validateMovieData = ({ title, genre, duration, year, synopsis }) => {
  // campos obligatorios no vacios
  if (typeof title !== "string" || title.trim() === "") {
    return "El campo 'title' es obligatorio y no puede estar vacío.";
  }
  if (typeof genre !== "string" || genre.trim() === "") {
    return "El campo 'genre' es obligatorio y no puede estar vacío.";
  }
  if (duration === undefined || duration === null || duration === "") {
    return "El campo 'duration' es obligatorio y no puede estar vacío.";
  }
  if (year === undefined || year === null || year === "") {
    return "El campo 'year' es obligatorio y no puede estar vacío.";
  }

  // duration entero mayor a cero sin negativos, cero, strings ni decimales
  if (!Number.isInteger(duration) || duration <= 0) {
    return "El campo 'duration' debe ser un número entero mayor a cero (sin decimales ni texto).";
  }

  // year entero entre 1888 y el año actual
  if (!Number.isInteger(year) || year < 1888 || year > CURRENT_YEAR) {
    return `El campo 'year' debe ser un número entero entre 1888 y ${CURRENT_YEAR}.`;
  }

  // synopsis debe ser string
  if (synopsis !== undefined && synopsis !== null && typeof synopsis !== "string") {
    return "El campo 'synopsis' debe ser una cadena de texto.";
  }

  return null;
};

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

// POST /api/movies de crear una pelicula
export const createMovie = async (req, res) => {
  try {
    const { title, genre, duration, year, synopsis } = req.body;

    // validacion de los datos
    const errorMessage = validateMovieData({ title, genre, duration, year, synopsis });
    if (errorMessage) {
      return res.status(400).json({ message: errorMessage });
    }

    // unicidad del titulo
    const existingMovie = await Movie.findOne({ where: { title } });
    if (existingMovie) {
      return res.status(400).json({
        message: `Ya existe una película registrada con el título '${title}'.`,
      });
    }

    // creacion
    const movie = await Movie.create({ title, genre, duration, year, synopsis });

    return res.status(201).json({
      message: "Película creada correctamente",
      movie,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// PUT /api/movies/:id de actualizacion
export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, genre, duration, year, synopsis } = req.body;

    // la pelicula debe existir
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res
        .status(404)
        .json({ message: `No existe una película con el id ${id}.` });
    }

    // validacion de los datos
    const errorMessage = validateMovieData({ title, genre, duration, year, synopsis });
    if (errorMessage) {
      return res.status(400).json({ message: errorMessage });
    }

    // unicidad del titulo
    const duplicatedMovie = await Movie.findOne({
      where: { title, id: { [Op.ne]: id } },
    });
    if (duplicatedMovie) {
      return res.status(400).json({
        message: `Ya existe otra película registrada con el título '${title}'.`,
      });
    }

    // actualizacion
    await movie.update({ title, genre, duration, year, synopsis });

    return res.status(200).json({
      message: "Película actualizada correctamente",
      movie,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// DELETE /api/movies/:id de eliminacion verificando existencia
export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res
        .status(404)
        .json({ message: `No existe una película con el id ${id}.` });
    }

    await movie.destroy();

    return res.status(200).json({
      message: `Película con id ${id} eliminada correctamente`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};