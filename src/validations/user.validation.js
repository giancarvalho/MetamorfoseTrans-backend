import * as userRepository from '../repositories/user.repository.js';
import newUserSchema from './schemas/newUser.schema.js';
import signInSchema from './schemas/signIn.schema.js';

async function validateSignIn({ email, password }) {
  const validation = { isInvalid: false, errorCode: null };
  const joiValidation = signInSchema.validate({ email, password });

  try {
    if (joiValidation.error) {
      validation.isInvalid = true;
      validation.errorCode = 400;
      return validation;
    }

    return validation;
  } catch (error) {
    validation.isInvalid = true;
    validation.errorCode = 500;

    return validation;
  }
}

async function validateNewUser(userData) {
  const validation = { isInvalid: false, errorCode: null };
  const joiValidation = newUserSchema.validate(userData);
  try {
    if (joiValidation.error) {
      validation.isInvalid = true;
      validation.errorCode = 400;
      return validation;
    }

    if (!userData.typeId) {
      validation.isInvalid = true;
      validation.errorCode = 400;
      return validation;
    }

    const isUser = await userRepository.find(userData.email);

    if (isUser) {
      validation.isInvalid = true;
      validation.errorCode = 409;

      return validation;
    }

    return validation;
  } catch (error) {
    validation.isInvalid = true;
    validation.errorCode = 500;

    return validation;
  }
}

export { validateNewUser, validateSignIn };
