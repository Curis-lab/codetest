export const USER_QUERY = {
    INSERT_USER:"INSERT INTO User (email, password, username) VALUES (?, ?, ?)",
    SELECT_USERS:"SELECT * FROM User",
    SELECT_USER_BY_ID:"SELECT * FROM User WHERE user_id = ?",
    SELECT_USER_BY_EMAIL:"SELECT * FROM User WHERE email = ?"
  }