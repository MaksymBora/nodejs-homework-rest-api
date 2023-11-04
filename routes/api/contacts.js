import { Router } from 'express';
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
} from '../../models/api-contacts.js';

const router = Router();

router.get('/', async (req, res) => {
  const contacts = await listContacts();

  res.status(200).json(contacts);
});

router.get('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.post('/', async (req, res) => {
  // res.send({ data: req.body });
  // console.log(req.body);

  const contact = await addContact(req.body);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(400).json({ message: 'missing required fields' });
  }
});

router.delete('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(400).json({ message: 'missing required fields' });
  }
});

router.put('/:contactId', async (req, res) => {
  // res.json({ message: 'template message' });

  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);

  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(400).json({ message: 'missing required fileds' });
  }
});

export default router;
