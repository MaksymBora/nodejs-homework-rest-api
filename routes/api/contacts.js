import { Router } from 'express';
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
} from '../../models/api-contacts.js';
import { contactSchema } from '../../validation/contact.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    if (!contacts) return next();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);
  if (!contact) return next();
  res.status(200).json(contact);
});

// Add new Contact
router.post('/', async (req, res) => {
  const response = contactSchema.validate(req.body, { abortEarly: false });

  if (typeof response.error !== 'undefined') {
    return res
      .status(400)
      .send(response.error.details.map(err => err.message).join(', '));
  }

  const contact = await addContact(response.value);

  if (!contact) res.status(400).json({ message: 'missing required fields' });

  res.status(201).json(contact);
});

router.delete('/:contactId', async (req, res) => {
  const { contactId } = req.params;

  const contact = await removeContact(contactId);

  if (!contact) res.status(400).json({ message: 'missing required fields' });

  res.status(200).json(contact);
});

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await updateContact(contactId, req.body);

  if (!contact) return next();

  res.status(200).json(contact);
});

export default router;
