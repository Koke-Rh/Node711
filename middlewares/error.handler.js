function logErrors(err, req, res, next) {
  console.error(err);
  next(err); //Al enviarle el err entiende que es un middleware de error
}



// ESTE ES EL MANEJADOR DE ERRORES INTELIGENTE
function errorHandler(err, req, res, next) {
  // 1. Revisa si el error que viene del servicio (como el 404) trae un statusCode
  const statusCode = err.statusCode || 500;

  // 2. Responde con el código de estado correcto
  res.status(statusCode).json({
    message: err.message,
    stack: err.stack, // (En producción, deberías quitar el stack)
  });
}

// CAMBIO: Solo exportamos los dos middlewares que sí existen
module.exports = { logErrors, errorHandler };
