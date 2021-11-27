import * as userRepository from '../repositories/user.repository.js';
import newUserSchema from './schemas/newUser.schema.js';

async function validateNewUser(userData) {
  const joiValidation = newUserSchema.validate(userData);
  const validation = { isInvalid: false, errorCode: null };

  try {
    if (joiValidation.error) {
      validation.isInvalid = true;
      validation.errorCode = 400;
      return validation;
    }

    const isUser = await userRepository.find(userData.email);

    if (isUser.rowCount > 0) {
      validation.isInvalid = true;
      validation.errorCode = 404;

      return validation;
    }

    return validation;
  } catch (error) {
    validation.isInvalid = true;
    validation.errorCode = 500;

    return validation;
  }
}

export { validateNewUser };
