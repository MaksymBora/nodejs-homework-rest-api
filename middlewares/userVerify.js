import { Contact } from '../models/contact.js';
import { HttpError } from '../helpers/HttpError.js';

export const userVerify = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const contact = await Contact.findById(contactId);

  const verifyUser = contact.owner.toString() === _id.toString();

  if (!contact || !verifyUser) return next(HttpError(404, 'Contact not found'));

  next();
};