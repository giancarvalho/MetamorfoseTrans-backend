import pool from '../database.js';

async function create({ name, cpf, email, hashedPassword }) {
  const { id } = (
    await pool.query(
      'INSERT INTO clients (name, cpf, email, password) VALUES ($1, $2, $3, $4) RETURNING id;',
      [name, cpf, email, hashedPassword]
    )
  ).rows[0];

  return id;
}

async function find(email) {
  const result = await pool.query(
    `SELECT * FROM clients WHERE email = $1;
`,
    [email]
  );

  return result;
}

export { create, find };
