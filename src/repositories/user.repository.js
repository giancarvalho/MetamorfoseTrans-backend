import { v4 as uuid } from 'uuid';
import pool from '../database.js';

async function create({ name, email, hashedPassword, typeId }) {
  const { id } = (
    await pool.query(
      'INSERT INTO users (name, email, password, user_type_id) VALUES ($1, $2, $3, $4) RETURNING id;',
      [name, email, hashedPassword, typeId]
    )
  ).rows[0];

  return id;
}

async function find(email) {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1;
  `,
    [email]
  );
  if (!result.rowCount) return null;
  return result.rows[0];
}
async function findType(type) {
  const result = await pool.query('SELECT id FROM user_type WHERE name = $1;', [
    type,
  ]);
  
  return result.rows[0]?.id;
}
async function findSessionByUserId(userId) {
  try{
    const result = await pool.query(`SELECT * FROM sessions WHERE user_id = $1;`, [
      userId,
    ]);
    if (!result.rowCount) return null;
    return result.rows[0];
  }catch (error) {
    console.log('Error at findSessionByUserId', error.message);
    return false;
  }
}
async function deleteSessionById(id) {
  try{
    await pool.query(`DELETE FROM sessions WHERE id = $1;`, [id]);

  }catch (error) {
    console.log('Error at deleteSession', error.message);
    return false;
  }
}
async function createSession(userId) {
  const token = uuid();
  try{
    pool.query(`INSERT INTO sessions ("user_id", token) VALUES ($1, $2);`, [
      userId,
      token,
    ]);
  }catch (error) {
    console.log('Error at createSession', error.message);
    return false;
  }
  return token;
}

export { create, find, findType, findSessionByUserId, deleteSessionById,createSession };
