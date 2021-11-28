import pool from '../database.js';

async function clearSessions()  {
    try {
        pool.query(`DELETE FROM sessions;`);
      } catch (error) {
        console.log('Error at cleanSessions', error.message);
      }
  }
async function clearUsers() {
    try {
        pool.query(`DELETE FROM users;`);
      } catch (error) {
        console.log('Error at clearUsers', error.message);
      }
  }

  export {clearSessions,clearUsers}