import express from 'express';
import cors from 'cors';
import * as userController from './controllers/user.controller.js';
import validateToken from './middlewares/tokenValidator.js';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/sign-up', userController.signUp);
app.post('/sign-in', userController.signIn);
app.delete('/session', validateToken ,userController.logOut);
app.get('/health', (req, res) => {
  res.sendStatus(200);
});

export default app;
