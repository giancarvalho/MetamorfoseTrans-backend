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

async function validateSignIn(user) {
  const validation = await userValidation.validateSignIn(user);

  if (validation.isInvalid) {
    return validation;
  }
}
async function validateUserCredentials({ email, password }) {
  const user = await userRepository.find(email);

  if (bcrypt.compareSync(password, user.password) && !!user) return user;
  return false;
}

async function createSession(userId) {
  const previousSession = await userRepository.findSessionByUserId(userId);
  if (previousSession)
    await userRepository.deleteSessionById(previousSession.id);
  const token = await userRepository.createSession(userId);
  return token;
}

export { create, validateSignIn, validateUserCredentials, createSession };
