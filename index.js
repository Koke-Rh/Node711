const express = require("express");
const mongoose = require('mongoose'); // 1. Agregas Mongoose

const routerApi = require('./routes/rutas');
const setupSwagger = require('./swagger');
const { logErrors, errorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());

// --- 2. Lógica de Conexión a MongoDB (Exactamente como tu app.js) ---
mongoose.connect(
  'mongodb+srv://jorgereah28:hola1234@clustermapa.wpeinsr.mongodb.net/georef711?retryWrites=true&w=majority&appName=clustermapa'
)
.then(() => console.log('✅ Conexión a MongoDB exitosa'))
.catch(err => console.error('No se puede conectar a MongoDB', err));
// --- Fin de la Conexión ---

app.get("/", (req, res) => {
  res.send("Hola desde mi server Express");
});

// --- 3. Tus rutas y middlewares (esto sigue igual) ---
routerApi(app);
setupSwagger(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
