import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'VestiMeteo API',
    version: '1.0.0',
    description: 'Ce projet vise à intégrer un backend relié à une l apiOpen Weather pour récupérer des informations sur les conditions météorologiques, puis à utiliser ces données pour recommander des tenues vestimentaires appropriées aux utilisateurs : Voilà le but de Vesti Météo !',
    termsOfService: "http://swagger/io/terms/",
    contact: {
      email: 'ponsjeffrey@gmail.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0'
    },
    host: "http://localhost:8000/api-docs/#/weather"
  },
  servers: [
    {
      url: 'http://localhost:8000/',
      description: 'Development Server'
    },
  ],
  securityDefinitions: {
    apiKey: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter your bearer token in the format Bearer <token>'
    }
  },
};

const options = {
  swaggerDefinition,
  apis: [
    './src/routes/user.routes.ts',
    './src/controllers/*.ts',
    './src/models/*.ts'
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
