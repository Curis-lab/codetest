//express5 contain async error handly
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

import {
  getUser,
  getUserById,
  createUser,
  writePost,
  checkEmailForLogin,
  getAllPost,
  deletePostById,
} from "./database.js";
const salt = 10;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(cookieParser());
/* Start User */
app.get("/user", async (req, res) => {
  const users = await getUser();
  res.send(users);
});

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const getUser = await getUserById(id);
  res.send(getUser);
});
/*End of User*/

/*Start Post*/
app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  await deletePostById(id);
});
app.get("/all-post", async (req, res) => {
  const posts = await getAllPost();
  res.send(posts);
});

app.post("/create-post", async (req, res) => {
  const { user_id, title, imageURL, content, referencesURL, category_id } =
    req.body;
  //get name from authorization
  const name = req.user.name;
  //!we can not remmenber for long parameter so REFACTOR IT
  const createdPost = await writePost(
    user_id,
    title,
    imageURL,
    content,
    referencesURL,
    category_id
  );
  res.status(201).send(name);
});
/*End of Post*/

//Auth

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await checkEmailForLogin(email);

  bcrypt.compare(password, result[0].password, (err, respond) => {
    if (err) {
      // res.send("Error: Invalid Login Error");
      return res.json({ logged: false });
    } else if (respond) {
      const user = { name: result[0].username };
      const accessToken = jwt.sign(user, "jwt-token-key", {
        expiresIn: "1d",
      });
      res.cookie("token", accessToken);
      return res.json({ logged: true });
    } else {
      // res.send("Error: Password does not match");
      return res.json({ logged: false });
    }
  });
});

app.post("/registration", (req, res) => {
  const { email, password, username } = req.body;
  bcrypt.hash(password.toString(), salt, async (err, password) => {
    if (err) {
      res.status(500).send({ Error: "Error for hashing password" });
    } else {
      const newRegistration = await createUser(email, password, username);
      res.status(201).send(newRegistration);
    }
  });
});
/* End of Auth */

app.use((err, req, res, next) => {
  console.err(err.stack);
  res.status(500).send("Something broke!");
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).send("auth fail");
  jwt.verify(token, "accesstokensec", (err, user) => {
    if (err) return res.status(403).send("access token error");
    req.user = user;
    next();
  });
}

app.listen(8080, () => {
  console.log("Server is running on 8080");
});
