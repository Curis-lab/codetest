import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getUser() {
  const [rows] = await pool.query("SELECT * FROM User");
  return rows;
}

export async function getUserById(id) {
  const [rows] = await pool.query(`SELECT * FROM User WHERE id = ?`, [id]);
  return rows;
}

export async function checkEmailForLogin(email) {
  const [rows] = await pool.query(`SELECT * FROM User WHERE email = ?`, [
    email,
  ]);
  return rows;
}

export async function createUser(email, password, username) {
  const result = await pool.query(
    `INSERT INTO user (email, password, username) VALUES (?, ?, ?)`,
    [email, password, username]
  );
  const id = result.insertId;
  return getUserById(id);
}

//Posting
async function getPostByID(id) {
  const [rows] = await pool.query(`SELECT * FROM Post WHERE post_id = ?`, [id]);
  return rows;
}

export async function writePost(
  user_id,
  title,
  imageURL,
  content,
  referencesURL,
  category_id
) {
  const result = await pool.query(
    `INSERT INTO Post (user_id, title, imageURL, content, referencesURL, category_id) VALUES(?,?,?,?,?,?)`,
    [user_id, title, imageURL, content, referencesURL, category_id]
  );
  return getPostByID(result.insertId);
}
