import * as userValidation from '../../src/validations/user.validation.js';
import { createEmailAndPassword } from '../factories/user.factory';
import faker from 'faker';

describe('Unit test signIn validation', () => {
  it('should return a 400 errorCode if email property is not passed', async () => {
    const user = createEmailAndPassword();

    delete user.email;

    const result = await userValidation.validateSignIn(user);

    expect(result.errorCode).toBe(400);
  });

  it('should return a 400 errorCode if passwor is too short', async () => {
    const user = createEmailAndPassword();
    user.password = '123';

    const result = await userValidation.validateSignIn(user);

    expect(result.errorCode).toBe(400);
  });

  it('should return a 400 errorCode if email is not valid', async () => {
    const user = createEmailAndPassword();

    user.email = faker.lorem.words();

    const result = await userValidation.validateSignIn(user);

    expect(result.errorCode).toBe(400);
  });
});
