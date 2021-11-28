import pool from '../database.js';

async function create({ name, email, hashedPassword }) {
  const { id } = (
    await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id;',
      [name, email, hashedPassword]
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

export { create, find };
