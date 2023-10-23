const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const express = require('express');

const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js API',
      version: '1.0.0',
      description: 'API documentation for the Node.js API',
    },
  },
  apis: ['server.js'],
};

const specs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

const port = 3000;
app.listen(port, () => {
  console.log(`Swagger UI is running on http://localhost:${port}/api-docs`);
});
