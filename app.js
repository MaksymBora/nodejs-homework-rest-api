import express, { json } from 'express';
import logger from 'morgan';
import cors from 'cors';
import contactsRouter from './routes/api/contacts.js';
import 'colors';
import morgan from 'morgan';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));

app.use(cors());
app.use(json());

app.use('/api/contacts', contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found!' });
});

app.use((err, _, res, __) => {
  console.log('Error Here!'.red);
  console.error(err);

  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;

// const contactSchema = joi.object({
//   name: joi.string().min(3), //NAME SHOULD HAVE MINIMUM 3 SYMBOLS
//   email: joi.string().email(), //EMAIL SHOULD BE IN CORRECT FORMAT
//   phone: joi.string().min(5), //PHONE SHOULD HAVE AT LEAST 5 SYMBOLS
// });

// const validator = schema => body => {
//   return schema.validate(body);
// };

// const contactValidator = validator(contactSchema);
