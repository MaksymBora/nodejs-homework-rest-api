import { Router } from 'express';
import {
  add,
  getAll,
  getById,
  removeContactById,
  updateById,
  updateFavorite,
} from '../../controllers/api-contacts.js';
import { isValidId } from '../../middlewares/isValidId.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { userVerify } from '../../middlewares/userVerify.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

// Get all contacts
contactsRouter.get('/', getAll);

// Get contact by ID
contactsRouter.get('/:contactId', isValidId, getById);

// Add new Contact
contactsRouter.post('/', add);

// Update contact's information
contactsRouter.put('/:contactId', userVerify, isValidId, updateById);

// Update contact Status by ID
contactsRouter.patch(
  '/:contactId/favorite',
  userVerify,
  isValidId,
  updateFavorite,
);

// Delete Contact
contactsRouter.delete('/:contactId', userVerify, removeContactById);

export default contactsRouter;
