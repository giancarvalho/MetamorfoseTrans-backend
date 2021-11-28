import bcrypt from 'bcrypt';
import * as userRepository from '../repositories/user.repository.js';
import * as userValidation from '../validations/user.validation.js';

async function create(user) {
  const typeId = await userRepository.findType(user.type);
  const userData = { ...user, typeId };
  const validation = await userValidation.validateNewUser(userData);

  if (validation.isInvalid) {
    return validation;
  }

  const { name, password, email, cpf } = userData;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const result = await userRepository.create({
    name,
    hashedPassword,
    email,
    cpf,
    typeId,
  });

  return { id: result };
}

export { create };
