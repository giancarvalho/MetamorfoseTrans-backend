import bcrypt from 'bcrypt';
import * as userRepository from '../repositories/user.repository.js';
import * as userValidation from '../validations/user.validation.js';

async function create(user) {
  const validation = await userValidation.validateNewUser(user);

  if (validation.isInvalid) {
    return validation;
  }

  const { name, password, email, cpf } = user;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const result = await userRepository.create({
    name,
    hashedPassword,
    email,
    cpf,
  });

  return { id: result };
}

export { create };
