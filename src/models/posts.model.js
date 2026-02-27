const pool = require("../config/db");

const create = async ({ userId, title, content }) => {
  const [result] = await pool.query(
    "INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)",
    [userId, title, content]
  );
  return result.insertId;
};

const findAllPublic = async () => {
  const [rows] = await pool.query(`
    SELECT p.id, p.title, p.content, p.created_at, u.email AS author
    FROM posts p
    JOIN users u ON u.id = p.user_id
    ORDER BY p.created_at DESC
  `);
  return rows;
};

const findByIdPublic = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT p.id, p.title, p.content, p.created_at, u.email AS author, p.user_id
    FROM posts p
    JOIN users u ON u.id = p.user_id
    WHERE p.id = ?
    LIMIT 1
    `,
    [id]
  );
  return rows[0];
};

const updateByIdForUser = async ({ id, userId, title, content }) => {
  const [result] = await pool.query(
    "UPDATE posts SET title = ?, content = ? WHERE id = ? AND user_id = ?",
    [title, content, id, userId]
  );
  return result.affectedRows;
};

const deleteByIdForUser = async ({ id, userId }) => {
  const [result] = await pool.query(
    "DELETE FROM posts WHERE id = ? AND user_id = ?",
    [id, userId]
  );
  return result.affectedRows;
};

module.exports = {
  create,
  findAllPublic,
  findByIdPublic,
  updateByIdForUser,
  deleteByIdForUser,
};
