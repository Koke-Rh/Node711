const express = require("express");
const mongoose = require("mongoose");

const routerApi = require("./routes/rutas");
const setupSwagger = require("./swagger");
const { logErrors, errorHandler } = require("./middlewares/error.handler");

const app = express();

// --- Puerto dinámico para Railway ---
const port = process.env.PORT || 3000;

app.use(express.json());

// --- Conexión a MongoDB usando variable de entorno ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conexión a MongoDB exitosa"))
  .catch((err) => console.error("❌ Error conectando a MongoDB:", err));

app.get("/", (req, res) => {
  res.send("Hola desde mi server Express");
});

// Rutas y middlewares
routerApi(app);
setupSwagger(app);

app.use(logErrors);
app.use(errorHandler);

// --- Escuchar en puerto de Railway ---
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
