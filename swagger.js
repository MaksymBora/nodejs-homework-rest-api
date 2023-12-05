// import { Express, Request, Response } from 'express';
// import swaggerJsdoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
// import { version } from './package.json';

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'REST API Docs',
//       version,
//     },
//   },
//   components: {
//     securitySchemas: {
//       bearerAuth: {
//         type: 'http',
//         schema: 'bearer',
//         bearerFormat: 'JWT',
//       },
//     },
//   },
//   security: [
//     {
//       bearerAuth: [],
//     },
//   ],
//   apis: [
//     './routes/api/auth-router.js',
//     './routes/api/contacts-router.js',
//     './routes/api/movies-router.js',
//     './schemas/*.js',
//   ],
// };

// const swaggerSpec = swaggerJsdoc(options);

// function swaggerDocs(app, port) {
//   // Swagger page
//   app.use('docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//   // Docs in JSON format
//   app.get('docs.json', (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.send(swaggerSpec);
//   });

//   //   log.info(`Docs available at https://localhost:${port}/docs`);
// }

// export default swaggerDocs;
