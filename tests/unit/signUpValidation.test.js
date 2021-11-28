import * as userValidation from '../../src/validations/user.validation.js';
import { createFakeUser } from '../factories/user.factory';
import faker from 'faker';

describe('Unit test signUp validation', () => {
  it('should return a 400 errorCode if name property is not passed', async () => {
    const user = createFakeUser();

    user.name = '';

    const result = await userValidation.validateNewUser(user);

    expect(result.errorCode).toBe(400);
  });

  it('should return a 400 errorCode if name is too long', async () => {
    const user = createFakeUser();

    user.name = faker.lorem.paragraph();

    const result = await userValidation.validateNewUser(user);

    expect(result.errorCode).toBe(400);
  });

  it('should return a 400 errorCode if email is not valid', async () => {
    const user = createFakeUser();

    user.email = faker.lorem.words();

    const result = await userValidation.validateNewUser(user);

    expect(result.errorCode).toBe(400);
  });
});
