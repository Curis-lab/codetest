import pool from "./config/mysql.config.js";
import {POST_QUERY, USER_QUERY} from './query/index.js';

export async function getUser(){
  const [rows] = await pool.query(USER_QUERY.SELECT_All);
  return rows;
}

export async function getUserById(id) {
  const [rows] = await pool.query(USER_QUERY.SELECT_ID, [id]);
  return rows;
}

export async function checkEmailForLogin(email) {
  const [rows] = await pool.query(SELECT_EMAIL, [
    email,
  ]);
  return rows;
}

export async function createUser(email, password, username) {
  const result = await pool.query(USER_QUERY.INSERT,
    [email, password, username]
  );
  const id = result.insertId;
  return getUserById(id);
}



export async function getPostByID(id) {
  const [rows] = await pool.query(POST_QUERY.SELECT_ID, [id]);
  return rows;
}
export async function updatePost(title, content, imageURL, links, category_id, postId){
  const referencesURL = links;
  const [rows] = await pool.query(POST_QUERY.UPDATE,
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
    POST_QUERY.INSERT,
    [user_id, title, imageURL, content, referencesURL, category_id]
  );
  return getPostByID(result.insertId);
}

export async function getAllPost() {
  const [rows] = await pool.query(POST_QUERY.SELECT_ALL);
  return rows;
}

export async function deletePostById(id) {
  await pool.query(POST_QUERY.DELETE_ID,[id]);
  return getAllPost();
}