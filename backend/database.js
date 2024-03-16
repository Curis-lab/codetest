import pool from "./config/mysql.config.js";
import { USER_QUERY } from "./query/user.query.js";


export async function getUser(){
  const [rows] = await pool.query(USER_QUERY.SELECT_USERS);
  return rows;
}

export async function getUserById(id) {
  const [rows] = await pool.query(USER_QUERY.SELECT_USER_BY_ID, [id]);
  return rows;
}

export async function checkEmailForLogin(email) {
  const [rows] = await pool.query(SELECT_USER_BY_EMAIL, [
    email,
  ]);
  return rows;
}

export async function createUser(email, password, username) {
  const result = await pool.query(USER_QUERY.INSERT_USER,
    [email, password, username]
  );
  const id = result.insertId;
  return getUserById(id);
}

// export async function createUser(email, password, username) {
//   const result = await pool.query(
//     `INSERT INTO user (email, password, username) VALUES (?, ?, ?)`,
//     [email, password, username]
//   );
//   const id = result.insertId;
//   return getUserById(id);
// }

//Posting
export async function getPostByID(id) {
  const [rows] = await pool.query(`SELECT * FROM Post WHERE post_id = ?`, [id]);
  return rows;
}
export async function updatePost(title, content, imageURL, links, category_id, postId){
  const referencesURL = links;
  const [rows] = await pool.query('UPDATE posts SET title = ?, content = ? ,imageURL = ?, referencesURL=?, category_id=?  WHERE id = ?',
  [title, content,imageURL, referencesURL, category_id, postId]);
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

export async function getAllPost() {
  const [rows] = await pool.query("SELECT * FROM Post");
  return rows;
}

export async function deletePostById(id) {
  await pool.query(`DELETE FROM Post WHERE post_id = ?`,[id]);
  return getAllPost();
}