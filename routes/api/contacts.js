import { Router } from 'express';
import {
  add,
  getAll,
  getById,
  removeContact,
  updateById,
  updateFavorite,
} from '../../models/api-contacts.js';
import { contactValidate } from '../../models/contact.js';
import { isValidId } from '../../helpers/isValidId.js';

const router = Router();

router.get('/', getAll);

// Get contact by ID
router.get('/:contactId', isValidId, getById);

// Add new Contact
router.post('/', add);

// Update contact's information
router.put('/:contactId', isValidId, updateById);

// Update favorite flag
router.patch('/:contactId/favorite', isValidId, updateFavorite);

// Delete Contact
router.delete('/:contactId', async (req, res) => {
  const { contactId } = req.params;

  const contact = await removeContact(contactId);

  if (!contact) res.status(400).json({ message: 'missing required fields' });

  res.status(200).json(contact);
});

export default router;
