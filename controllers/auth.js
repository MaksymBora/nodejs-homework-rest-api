import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { User } from '../models/user.js';

const { SECRET_KEY } = process.env;

export const register = async (req, res, next) => {
  const { password, email, subscription } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (user !== null) res.status(409).send({ message: 'Email in use' });

    const passwordHash = bcrypt.hashSync(password, 10);

    await User.create({ password: passwordHash, email, subscription });

    res.status(201).send({
      user: {
        email,
        subscription,
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

    if (user === null)
      res.status(401).send({ message: 'Email or password is incorrect' });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      res.status(401).send({ message: 'Email or password is incorrect' });

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};
