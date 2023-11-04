import joi from 'joi';

export const contactSchema = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});
