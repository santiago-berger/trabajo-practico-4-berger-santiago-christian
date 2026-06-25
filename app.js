import express from "express";

const app = express();
const PORT = 3000;

// Middleware para que Express entienda el body en formato JSON
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});