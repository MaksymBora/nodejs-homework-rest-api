import express, { json } from 'express';
import logger from 'morgan';
import cors from 'cors';
import contactsRouter from './routes/api/contacts-router.js';
import userRouter from './routes/api/auth-router.js';
import moviesRouter from './routes/api/movies-router.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Documentation',
      version: '0.1.0',
      description:
        'This is a simple API application made with Expess and documented with Swagger',
      contact: {
        name: 'Maksym Borovichenko',
        url: 'https://github.com/MaksymBora/nodejs-homework-rest-api',
        email: 'maxboraod@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://web4you.space/',
      },
    ],
  },
  apis: ['./routes/api/*.js'],
};

const spacs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spacs));

app.use(logger(formatsLogger));
app.use(cors());
app.use(json());
app.use(express.static('public'));

app.use('/api/contacts', contactsRouter);
app.use('/users', userRouter);
app.use('/favorite', moviesRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found!' });
});

app.use((err, _, res, __) => {
  const { status = 500, message = 'Internal Server Error' } = err;

  res.status(status).json({ message });
});

export default app;
