import '../../src/server.js';
import app from '../../src/app.js';
import supertest from 'supertest';
import { createFakeUser } from '../factories/user.factory.js';
import * as userService from '../../src/services/user.service.js';
import * as testService from '../../src/services/test.service.js';
import faker from 'faker';
import pool from '../../src/database.js';

describe('POST /sign-in', () => {
  const existingUser = createFakeUser();
  let userId;
  beforeAll(async () => {
    userId = await userService.create(existingUser);
  });

  afterAll(async () => {
    await testService.clearDatabase();
    pool.end();
  });
  
  it('should return 200 for success', async () => {
    const {email,password} = existingUser;

    const result = await supertest(app).post('/sign-in').send({email,password});
    const userData = JSON.parse(result.text);
    expect(userData?.token.length).toEqual(36);
    expect(result.status).toEqual(200);
  });

  it('should return 401 if password is wrong', async () => {
      const {email} = existingUser;
    const password = faker.internet.password();
    const result = await supertest(app).post('/sign-in').send({email,password});
    expect(result.status).toEqual(401);
  });

});
