import { Router } from 'express';
import authenticate from '../../middlewares/authenticate.js';
import moviesController from '../../controllers/movies-controller.js';

const moviesRouter = Router();

moviesRouter.use(authenticate);

// Get list with fav movies
moviesRouter.get('/', moviesController.getAll);

// Add movie in Favorite List
moviesRouter.post('/', moviesController.addInFav);

export default moviesRouter;
