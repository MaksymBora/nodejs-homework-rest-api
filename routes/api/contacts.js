import { Router } from 'express';
import {
  addContact,
  getContactById,
  listContacts,
} from '../../models/api-contacts.js';

const router = Router();

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();

  res.status(200).json(contacts);
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.post('/', async (req, res, next) => {
  // res.send({ data: req.body });
  // console.log(req.body);

  const contact = await addContact(req.body);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(400).json({ message: 'missing required fields' });
  }
});

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

export default router;
