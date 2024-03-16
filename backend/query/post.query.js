export const POST_QUERY = {
    SELECT_ALL:"SELECT * FROM Post",
    SELECT_ID:"SELECT * FROM Post WHERE post_id = ?",
    DELETE_ID:"DELETE FROM Post WHERE post_id = ?",
    UPDATE:"UPDATE Posts SET title = ?, content = ? ,imageURL = ?, referencesURL=?, category_id=?  WHERE id = ?",
    INSERT:"INSERT INTO Post (user_id, title, imageURL, content, referencesURL, category_id) VALUES(?,?,?,?,?,?)"
  }