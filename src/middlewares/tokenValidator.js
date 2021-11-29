import { findSessionByToken } from '../repositories/user.repository.js';
import * as tokenService from '../services/token.service.js';

export default async function validateToken(req, res, next) {
  const { authorization } = req.headers;

  const authValidation = tokenService.validateAuthorization(authorization);
  if (authValidation === 'invalid') return res.sendStatus(400);
  if (authValidation === 'empty') return res.sendStatus(422);
  const token = authValidation;
  const session = await findSessionByToken(token);
  if (!session) return res.sendStatus(404);
  req.locals = token;
  next();
}
