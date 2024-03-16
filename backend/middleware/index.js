export const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.send("Cookies is not exist");
  } else {
    jwt.verify(token, "jwt-token-key", (err, decoded) => {
      if (err) {
        res.send("Error in Cookies");
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};
