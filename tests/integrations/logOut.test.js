import '../../src/server.js';
import app from '../../src/app.js';
import supertest from 'supertest';
import { createFakeUser } from '../factories/user.factory.js';
import * as userService from '../../src/services/user.service.js';
import * as testService from '../../src/services/test.service.js';
import faker from 'faker';
import pool from '../../src/database.js';

describe('DELETE /session', () => {
  const existingUser = createFakeUser();
  let userId;
  let token;
  beforeAll(async () => {
    userId = await userService.create(existingUser);
    token = await userService.createSession(userId.id);
  });

  afterAll(async () => {
    await testService.clearDatabase();
    pool.end();
  });

  it('should return 200 for success', async () => {
    const headers = {authorization: 'Bearer ' + token};

    const result = await supertest(app)
      .delete('/session')
      .set(headers);
    expect(result.status).toEqual(200);
  });
  it('should return 404 for session not found', async () => {
      const newToken = faker.datatype.uuid();
    const headers = {authorization: 'Bearer ' + newToken};

    const result = await supertest(app)
      .delete('/session')
      .set(headers);
    expect(result.status).toEqual(404);
  });
});
