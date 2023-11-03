import { promises as fs } from 'fs';
import { nanoid } from 'nanoid';
import path from 'path';
import 'colors';

const contactsPath = path.resolve('./db/contacts.json');

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');

    return JSON.parse(data);
  } catch (error) {
    console.log(error.red);
  }
}

export async function getContactById(contactId) {
  try {
    const data = await listContacts();
    return data.find(contact => contact.id === contactId) || null;
  } catch (error) {
    console.log(error.red);
  }
}

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

export async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const updatedContacts = [newContact, ...contacts];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), {
      encoding: 'utf-8',
    });

    return newContact;
  } catch (error) {
    console.log(error.red);
  }
}
