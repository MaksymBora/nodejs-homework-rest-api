import { Router } from 'express';
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
} from '../../models/api-contacts.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    if (!contacts) res.status(404).json({ message: 'Not found' });
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);
  if (!contact) res.status(404).json({ message: 'Not found' });
  res.status(200).json(contact);
});

router.post('/', async (req, res) => {
  // res.send({ data: req.body });
  // console.log(req.body);

  const contact = await addContact(req.body);

  if (!contact) res.status(400).json({ message: 'missing required fields' });

  res.status(201).json(contact);
});

router.delete('/:contactId', async (req, res) => {
  const { contactId } = req.params;

  const contact = await removeContact(contactId);

  if (!contact) res.status(400).json({ message: 'missing required fields' });

  res.status(200).json(contact);
});

router.put('/:contactId', async (req, res) => {
  // res.json({ message: 'template message' });

  const { contactId } = req.params;

  const contact = await updateContact(contactId, req.body);

  if (!contact) res.status(400).json({ message: 'Not found' });

  res.status(200).json(contact);
});

export default router;
