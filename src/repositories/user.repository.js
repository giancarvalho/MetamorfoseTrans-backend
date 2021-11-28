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

  return result;
}

async function findType(type) {
  const result = await pool.query('SELECT id FROM user_type WHERE name = $1', [
    type,
  ]);

  return result.rows[0]?.id;
}

export { create, find, findType };
