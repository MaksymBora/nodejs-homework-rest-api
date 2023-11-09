import { Router } from 'express';
import {
  add,
  getAll,
  getById,
  removeContact,
  updateContact,
} from '../../models/api-contacts.js';
import { contactValidate } from '../../models/contact.js';
import { isValidId } from '../../helpers/isValidId.js';

const router = Router();

router.get('/', getAll);

// Get contact by ID
router.get('/:contactId', isValidId, getById);

// Add new Contact
router.post('/', add);

// Delete Contact
router.delete('/:contactId', async (req, res) => {
  const { contactId } = req.params;

  const contact = await removeContact(contactId);

  if (!contact) res.status(400).json({ message: 'missing required fields' });

  res.status(200).json(contact);
});

// Update contact's information
router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  const { error } = contactValidate(req.body);

  if (typeof error !== 'undefined') {
    const errorMessages = error.details.map(
      err => `missing field: ${err.message}`,
    );
    return res.status(400).json({ messages: errorMessages });
  }

  const contact = await updateContact(contactId, req.body);

  if (!contact) return next();

  res.status(200).json(contact);
});

export default router;
