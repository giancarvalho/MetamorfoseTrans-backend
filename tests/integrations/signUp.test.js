import '../../src/server.js';
import app from '../../src/app.js';
import supertest from 'supertest';
import { createFakeUser } from '../factories/user.factory.js';
import * as userService from '../../src/services/user.service.js';
import pool from '../../src/database.js';

describe('POST /sign-up', () => {
  const existingUser = createFakeUser();

  beforeAll(async () => {
    await userService.create(existingUser);
  });

  afterAll(async () => {
    pool.end();
  });

  it('should return 409 if user is already registered', async () => {
    const result = await supertest(app).post('/sign-up').send(existingUser);

    expect(result.status).toEqual(409);
  });

  it('should return 201 if signUp is body is valid', async () => {
    const user = createFakeUser();

    const result = await supertest(app).post('/sign-up').send(user);

    expect(result.status).toEqual(201);
  });
});
