import express from "express";
import { startDB } from "./src/config/database.js";

const app = express();
const PORT = 3000;

// middleware para que express entienda el body en formato json
app.use(express.json());

app.listen(PORT, async () => {
    await startDB();
    console.log(`Servidor listo en http://localhost:${PORT}`);
});