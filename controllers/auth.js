import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { User } from '../models/user.js';
import { HttpError } from '../helpers/HttpError.js';

const { SECRET_KEY } = process.env;

export const register = async (req, res, next) => {
  const { password, email } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (user) throw HttpError(409, 'Email in use');

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      ...req.body,
      password: passwordHash,
    });

    res.status(201).send({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) throw HttpError(401, 'Email or password is wrong');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw HttpError(401, 'Email or password is wrong');

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

    res.status(200).json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
};
