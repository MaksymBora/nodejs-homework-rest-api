import { Router } from 'express';
import authenticate from '../../middlewares/authenticate.js';
import moviesController from '../../controllers/movies-controller.js';
import { movieVerify } from '../../middlewares/movieVerify.js';

const moviesRouter = Router();

moviesRouter.use(authenticate);

// Get list with fav movies
moviesRouter.get('/', moviesController.getAll);

// Add movie in Favorite List
moviesRouter.post('/', moviesController.addInFav);

// Remove movie from favorite List
moviesRouter.delete('/:movieId', movieVerify, moviesController.remove);

export default moviesRouter;

/**
 * @swagger
 * components:
 *  schemas:
 *    Movies:
 *      type: object
 *      required:
 *        - name
 *        - poster
 *        - date
 *        - movieId
 *        - rating
 *        - type
 *        - owner
 *      properties:
 *        _id:
 *          type: string
 *          description: Backend-generated unique identifier
 *        poster:
 *          type: string
 *          description: Movie's image
 *        name:
 *          type: string
 *          description: Movie title
 *        date:
 *          type: string
 *          "description": Released data
 *        movieId:
 *          type: integer
 *          "description": Movie Identifier
 *        rating:
 *          type: integer
 *          "description": Movie's rating
 *        type:
 *          type: string
 *          "description": Type of Movie - 'movie' or 'shows'
 *
 *
 *
 */
