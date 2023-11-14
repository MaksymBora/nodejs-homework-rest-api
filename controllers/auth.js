import { User } from '../models/user.js';

export const register = async (req, res, next) => {
  const { password, email, subscription } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (user !== null) res.status(409).send({ message: 'User already exists' });

    await User.create({ password, email, subscription });

    res.status(201).send({ message: 'User created' });
  } catch (error) {
    console.log(error);
  }
};
