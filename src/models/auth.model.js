const pool = require("../config/db");

const findByEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT id, email, password FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  return rows[0]; // undefined si pas trouvé
};

const findById = async (id) => {
  const [rows] = await pool.query(
    "SELECT id, email FROM users WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0];
};

const createUser = async (email, hashedPassword) => {
  const [result] = await pool.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashedPassword]
  );
  return result.insertId;
};

module.exports = { findByEmail, findById, createUser };
