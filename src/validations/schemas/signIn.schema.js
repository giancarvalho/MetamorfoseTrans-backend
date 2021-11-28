import joi from 'joi';

const signInSchema = joi.object({
  email: joi.string().email().max(60).required(),
  password: joi.string().min(6).max(60).required(),
});

export default signInSchema;
