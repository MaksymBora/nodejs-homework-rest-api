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

const router = Router();

router.get('/', authenticate, getAll);

// Get contact by ID
router.get('/:contactId', authenticate, isValidId, getById);

// Add new Contact
router.post('/', authenticate, add);

// Update contact's information
router.put('/:contactId', authenticate, userVerify, isValidId, updateById);

// Update contact Status by ID
router.patch(
  '/:contactId/favorite',
  authenticate,
  userVerify,
  isValidId,
  updateFavorite,
);

// Delete Contact
router.delete('/:contactId', authenticate, userVerify, removeContactById);

export default router;
