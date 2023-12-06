import jwt from 'jsonwebtoken';
import { HttpError } from '../helpers/HttpError.js';
import { User } from '../models/user.js';
import { ctrlWrapper } from '../decorators/ctrlWrapper.js';

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;

  const [bearer, token] = authorization.split(' ');
  console.log(req.headers.authorization);

  if (bearer !== 'Bearer') {
    HttpError(401), 'Not authorized';
    next();
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token)
      next(HttpError(401), 'Not authorized');

    req.user = user;

    next();
  } catch {
    next(HttpError(401), 'Not authorized');
  }
};

export default ctrlWrapper(authenticate);
