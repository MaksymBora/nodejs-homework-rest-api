import { Router } from 'express';
import {
  add,
  getAll,
  getById,
  removeContactById,
  updateById,
  updateFavorite,
} from '../../controllers/api-contacts.js';
import { isValidId } from '../../helpers/isValidId.js';

const router = Router();

router.get('/', getAll);

// Get contact by ID
router.get('/:contactId', isValidId, getById);

// Add new Contact
router.post('/', add);

// Update contact's information
router.put('/:contactId', isValidId, updateById);

// Update contact Status by ID
router.patch('/:contactId/favorite', isValidId, updateFavorite);

// Delete Contact
router.delete('/:contactId', isValidId, removeContactById);

export default router;
