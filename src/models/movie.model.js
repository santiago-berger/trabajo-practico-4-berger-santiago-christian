import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// el campo id (clave primaria autoincremental) lo agrega sequelize
export const Movie = sequelize.define(
  "Movie",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // refuerza a nivel base de datos que el titulo sea unico
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER, // duracion en minutos
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER, // año de estreno
      allowNull: false,
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "movies",
  },
);