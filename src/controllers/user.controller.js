import * as userService from '../services/user.service.js';

async function signUp(req, res) {
  const userData = req.body;

  try {
    const result = await userService.create(userData);

    if (result.isInvalid) return res.sendStatus(result.errorCode);

    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(500);
  }
}
async function signIn(req, res) {
  const { email, password } = req.body;

  const signInEntries = await userService.validateSignIn({ email, password });
  if (signInEntries?.isInvalid) return res.sendStatus(signInEntries.errorCode);

  // validateUserCredentials returns userData or false
  const userCredentialsIsCorrect = await userService.validateUserCredentials({
    email,
    password,
  });
  if (!userCredentialsIsCorrect) return res.sendStatus(401);
  const userData = userCredentialsIsCorrect;
  const token = await userService.createSession(userData.id);

  delete userData.password;
  res.status(200).send({ token, userData });
}

export { signUp, signIn };
