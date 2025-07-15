const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Delegation API',
      version: '1.0.0',
      description: 'Backend API for managing users, teams, and tasks',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      },
      security: [{
        bearerAuth: []
      }]
      
  },
  apis: ['./routes/*.js'], // we’ll write Swagger comments in route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
