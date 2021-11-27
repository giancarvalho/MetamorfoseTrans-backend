import * as userService from '../services/user.service.js';

async function signUp(req, res) {
  const userData = req.body;

  try {
    const result = await userService.create(userData);

    if (!result) return res.sendStatus(400);

    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export { signUp };
