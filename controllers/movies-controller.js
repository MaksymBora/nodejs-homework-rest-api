import { ctrlWrapper } from '../decorators/ctrlWrapper.js';
import { HttpError } from '../helpers/HttpError.js';
import { Movies } from '../models/movies.js';

// ============ Get List of Favorites Movies ================ //

async function moviesList(req, res) {
  const { _id: owner } = req.user;

  let query = { owner };

  const data = await Movies.find(query, '-createdAt -updatedAt').populate(
    'owner',
  );

  res.json(data);
}

// ============ Add in Favorite List ================ //

async function addMovie(req, res) {
  const { _id: owner } = req.user;

  await Movies.create({ ...req.body, owner });

  res.status(201).json({ message: 'movie added' });
}

export default {
  getAll: ctrlWrapper(moviesList),
  addInFav: ctrlWrapper(addMovie),
};
