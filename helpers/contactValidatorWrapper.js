export const contactValidator = schema => data => {
  return schema.validate(data, { abortEarly: false });
};
