require('dotenv').config(); // 1. Cargar variables de entorno al inicio
const express = require("express");
const mongoose = require('mongoose');
const routerApi = require('./routes/rutas');
const setupSwagger = require('./swagger');
const { logErrors, errorHandler } = require('./middlewares/error.handler');

const app = express();

// 2. IMPORTANTE: Usar el puerto que te da Railway o el 3000 si es local
const port = process.env.PORT || 3000;

app.use(express.json());

// 3. Lógica de Conexión a MongoDB usando variable de entorno
// Si no existe la variable, lanzará error para avisarte
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("❌ ERROR: No se encontró la variable MONGO_URI");
} else {
  mongoose.connect(mongoUri)
    .then(() => console.log('✅ Conexión a MongoDB exitosa'))
    .catch(err => console.error('No se puede conectar a MongoDB', err));
}

app.get("/", (req, res) => {
  res.send("Hola desde mi server Express");
});

routerApi(app);
setupSwagger(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
