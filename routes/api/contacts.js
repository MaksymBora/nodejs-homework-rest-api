import { Router } from 'express';
import {
  add,
  getAll,
  getById,
  removeContact,
  updateContact,
} from '../../models/api-contacts.js';
import { contactValidate } from '../../validation/contact.js';

const router = Router();

// Get all contacts
// router.get('/', async (req, res, next) => {
//   try {
//     const contacts = await listContacts();

//     if (!contacts) return next();
//     res.status(200).json(contacts);
//   } catch (error) {
//     next(error);
//   }
// });

router.get('/', getAll);

// Get contact by ID
router.get('/:contactId', getById);

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
