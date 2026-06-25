import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";

// datos de conexion
const DB_NAME = "movies";
const DB_USER = "root";
const DB_PASSWORD = "";
const DB_HOST = "localhost";
const DB_PORT = 3306;

// crea la base movies en MySQL
const createDatabaseIfNotExists = async () => {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
  await connection.end();
};

// conexion de sequelize a la base movies
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  logging: false,
});

// prueba la conexion y sincroniza los modelos con la base de datos
export const startDB = async () => {
  try {
    await createDatabaseIfNotExists(); // se asegura de que la base exista
    await sequelize.authenticate();
    await sequelize.sync(); // crea la tabla si no existe
    console.log("Conexión a la base de datos lista");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
};