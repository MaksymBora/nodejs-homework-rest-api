import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../helpers/handleMongooseError.js';
import joi from 'joi';
import { contactValidator } from '../helpers/contactValidatorWrapper.js';

const phoneRegex = /^[0-9]{10}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: phoneRegex,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
);

contactSchema.post('save', handleMongooseError);

// Joi
export const contactSchemaJoi = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().required(),
  phone: joi.string().pattern(phoneRegex).required(),
  favorite: joi.boolean().default(false),
});

const updateFavoriteSchema = joi.object({
  favorite: joi.boolean().required(),
});

export const contactValidate = contactValidator(contactSchemaJoi);
export const favoriteValidate = contactValidator(updateFavoriteSchema);

export const Contact = model('contact', contactSchema);
