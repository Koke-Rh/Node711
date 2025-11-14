const express = require("express");
const mongoose = require('mongoose');

const routerApi = require('./routes/rutas');
const setupSwagger = require('./swagger');
const { logErrors, errorHandler } = require('./middlewares/error.handler');

const app = express();
// CAMBIO PARA RAILWAY: Usa el puerto que te asignen o el 3000 en local
const port = process.env.PORT || 3000;

app.use(express.json());

// --- Conexión a MongoDB ---
mongoose.connect(
  'mongodb+srv://jorgereah28:hola1234@clustermapa.wpeinsr.mongodb.net/georef711?retryWrites=true&w=majority&appName=clustermapa'
)
.then(() => console.log('✅ Conexión a MongoDB exitosa'))
.catch(err => console.error('No se puede conectar a MongoDB', err));

app.get("/", (req, res) => {
  res.send("Hola desde mi server Express en Railway!");
});

routerApi(app);
setupSwagger(app);

// Middlewares de error
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
