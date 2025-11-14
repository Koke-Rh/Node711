//SWAGGER.JS
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// 1. Metadatos de la API (Completando tu configuración)
const swaggerDefinition = {
  openapi: '3.0.0', // Corregí la coma por un punto
  info: {
    title: 'Mi API de Práctica',
    version: '1.0.0',
    description: 'Documentación de la API para la clase, con capa de servicios.'
  },
servers: [
  {
    url: 'https://node711-production-14b3.up.railway.app', // <--- ESTE VA PRIMERO (El de producción)
    description: 'Servidor de Producción (Railway)'
  },
  {
    url: 'http://localhost:3000', // Este va segundo (El local)
    description: 'Servidor de desarrollo local'
  }
]

};

// 2. Opciones para swagger-jsdoc
const options = {
  swaggerDefinition,
  // Ruta a los archivos que contienen la documentación (tus routers)
  apis: ['./routes/*.js']
};

// 3. Generamos la especificación de Swagger
const swaggerSpec = swaggerJSDoc(options);

// 4. Función para configurar Swagger en tu app de Express
const setupSwagger = (app) => {
  app.use(
    '/api-docs', // Esta es la URL donde verás la documentación
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  );
};

module.exports = setupSwagger;
