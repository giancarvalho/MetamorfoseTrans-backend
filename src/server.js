import './setup.js';
import app from './app.js';

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}.`);
  });
}
