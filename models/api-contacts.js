/* eslint-disable no-undef */
import mongoose from 'mongoose';
import { Contact } from './contact.js';
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
export async function listContacts(_, res) {
  // try {
  const data = await Contact.find();

  res.json(data);
  // } catch (error) {
  //   console.error('Error in listContacts:', error);
  //   throw error;
  // }
}

export const getAll = ctrlWrapper(listContacts);

// Get contact by ID
export async function getContactById(contactId) {
  try {
    const data = await listContacts();

    return data.find(contact => contact.id === contactId) || null;
  } catch (error) {
    console.log(error.red);
  }
}

// Add new contact
// export async function addContact(contactData) {
//   try {
//     const result = await Contact.create(contactData);

//     return result;
//   } catch (error) {
//     console.log(error.red);
//   }
// }

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
