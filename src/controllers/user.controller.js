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
  try {
    const signInEntries = await userService.validateSignIn({ email, password });
    if (signInEntries?.isInvalid) return res.sendStatus(signInEntries.errorCode);
  } catch (error) {
    console.log('Error at signIn check entries', error.message);
    return res.sendStatus(500);
  }
  let userData;
  try {
    // validateUserCredentials returns userData or false
    const userCredentialsIsCorrect = await userService.validateUserCredentials({
      email,
      password,
    });
    if (!userCredentialsIsCorrect) {
      console.log(userCredentialsIsCorrect);
      return res.sendStatus(401);}
    userData = userCredentialsIsCorrect;
  } catch (error) {
    console.log('Error at signIn check credentials', error.message);
    return res.sendStatus(500);
  }
  const token = await userService.createSession(userData.id);
  
  delete userData.password;
  res.status(200).send({ token, userData });
}

export { signUp, signIn };
