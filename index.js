const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // <--- 1. IMPORTANTE: Para manejar rutas de carpetas

const routerApi = require('./routes/rutas');
const setupSwagger = require('./swagger');
const { logErrors, errorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- 2. SERVIR EL FRONTEND (MAPA) ---
// Esto le dice a Express: "Todo lo que esté en la carpeta 'Public', muéstralo al mundo".
// Ahora, cuando entres a http://localhost:3000, verás tu index.html automáticamente.
app.use(express.static(path.join(__dirname, 'Public')));

// --- Conexión a MongoDB ---
mongoose.connect(
  'mongodb+srv://jorgereah28:hola1234@clustermapa.wpeinsr.mongodb.net/georef711?retryWrites=true&w=majority&appName=clustermapa'
)
.then(() => console.log('✅ Conexión a MongoDB exitosa'))
.catch(err => console.error('No se puede conectar a MongoDB', err));

// --- 3. RUTA RAÍZ COMENTADA ---
// Comenté esto porque ahora queremos que cargue el HTML del mapa, no este texto.
/*
app.get("/", (req, res) => {
  res.send("Hola desde mi server Express en Railway!");
});
*/

routerApi(app);
setupSwagger(app);

// Middlewares de error
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
