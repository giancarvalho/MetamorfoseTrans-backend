import faker from 'faker';
import * as tokenService from '../../src/services/token.service.js';

describe('Unit test signIn validation', () => {
  it('should return a token to pass', async () => {
    const authorization = 'Bearer cfd875e5-b9c5-4b8c-abd4-c7abf60410d0';
    const result = await tokenService.validateAuthorization(authorization);
    expect(result).toHaveLength(36);
  });
  it('should return invalid for without bearer', async () => {
    const authorization = 'Bear cfd875e5-b9c5-4b8c-abd4-c7abf60410d0';
    const result = await tokenService.validateAuthorization(authorization);
    expect(result).toEqual('invalid');
  });
  it('should return empty for no token', async () => {
    const authorization = 'Bearer ';
    const result = await tokenService.validateAuthorization(authorization);
    expect(result).toEqual('empty');
  });
  it('should return invalid for token not uuid', async () => {
    const authorization = 'Bearer cahswduaiwhiu';
    const result = await tokenService.validateAuthorization(authorization);
    expect(result).toEqual('invalid');
  });
});
