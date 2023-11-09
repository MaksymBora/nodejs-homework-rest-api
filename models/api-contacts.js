/* eslint-disable no-undef */
import mongoose from 'mongoose';
import { Contact, contactValidate, favoriteValidate } from './contact.js';
import 'colors';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';
import { contactValidator } from '../helpers/contactValidatorWrapper.js';

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

// Update existed contact
async function updateContact(req, res, next) {
  const { contactId } = req.params;

  const { error } = contactValidator(req.body);

  if (typeof error !== 'undefined') {
    const errorMessages = error.details.map(
      err => `missing field: ${err.message}`,
    );
    return res.status(400).json({ messages: errorMessages });
  }

  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!contact) return next();

  res.status(200).json(contact);
}

export const updateById = ctrlWrapper(updateContact);

// Update contact Status by ID
async function updateStatusContact(req, res, next) {
  const { contactId } = req.params;

  const { error } = favoriteValidate(req.body);

  if (typeof error !== 'undefined') {
    const errorMessages = error.details.map(
      err => `missing field: ${err.message}`,
    );
    return res.status(400).json({ messages: errorMessages });
  }

  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!contact) return next();

  res.status(200).json(contact);
}

export const updateFavorite = ctrlWrapper(updateStatusContact);

// Delete contact by ID
async function removeContact(req, res) {
  const { contactId } = req.params;

  const contact = await Contact.findByIdAndDelete(contactId);

  if (!contact) res.status(400).json({ message: 'missing required fields' });

  res.status(200).json(contact);
}

export const removeContactById = ctrlWrapper(removeContact);
