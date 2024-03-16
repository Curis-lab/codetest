export const USER_QUERY = {
  SELECT_All: "SELECT * FROM User",
  SELECT_ID: "SELECT * FROM User WHERE user_id = ?",
  SELECT_EMAIL: "SELECT * FROM User WHERE email = ?",
  INSERT: "INSERT INTO User (email, password, username) VALUES (?, ?, ?)",
};
