/* eslint-disable no-useless-escape */
import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../helpers/handleMongooseError.js';
import { phoneRegex } from '../constans/contacts-constans.js';

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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

// contactSchema.pre('findOneAndUpdate', handleUpdateValidate);
contactSchema.post('save', handleMongooseError);
// contactSchema.post('findOneAndUpdate', handleMongooseError);

export const Contact = model('contact', contactSchema);
