/* eslint-disable no-undef */
import mongoose from 'mongoose';
import { Contact, contactValidate } from './contact.js';
import path from 'path';
import 'colors';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';

const contactsPath = path.resolve('./models/contacts.json');

// Connect to MongoDB

const DB_URI = process.env['DB_URI'];

async function connectDB() {
  try {
    await mongoose.connect(DB_URI);
    console.log('Database connection successful');
  } catch (error) {
    console.error(error);
  }
}

connectDB().catch(console.error);

// Get full list of contacts
async function listContacts(_, res) {
  const data = await Contact.find({}, '-createdAt -updatedAt');
  res.json(data);
}

export const getAll = ctrlWrapper(listContacts);

//Get contact by ID
async function getContactById(req, res) {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);

  if (!contact) throw HttpError(404, 'Contact not found');

  res.json(contact);
}

export const getById = ctrlWrapper(getContactById);

// Add new contact
async function addContact(req, res) {
  const { error } = contactValidate(req.body);

  if (typeof error !== 'undefined') {
    return res
      .status(400)
      .send(error.details.map(err => err.message).join(', '));
  }

  const contact = await Contact.create(req.body);

  if (!contact) res.status(400).json({ message: 'missing required fields' });
  res.status(201).json(contact);
}

export const add = ctrlWrapper(addContact);

// Delete existed contact
export async function removeContact(contactId) {
  try {
    const data = await listContacts();

    const UpdatedContacts = data.filter(({ id }) => id !== contactId);

    await fs.writeFile(
      contactsPath,
      JSON.stringify(UpdatedContacts, null, 2),
      'utf-8',
    );

    const deletedContact =
      data.find(contact => contactId === contact.id) || null;

    return deletedContact;
  } catch (error) {
    console.log(error.red);
  }
}

// Update existed contact
export const updateContact = async (id, contactData) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);

  if (index === -1) {
    return undefined;
  }

  const newContact = { ...contactData, id };

  const updatedContacts = [
    ...contacts.slice(0, index),
    newContact,
    ...contacts.slice(index + 1),
  ];

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), {
    encoding: 'utf-8',
  });

  return newContact;
};
