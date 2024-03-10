import {
  getUser,
  getUserById,
  createUser,
  writePost,
  checkEmailForLogin,
  getAllPost,
  deletePostById,
  getPostByID,
  updatePost
} from "./database.js";
//express5 contain async error handly
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

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

const verifyUser = (req, res, next) => {
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

app.get("/", verifyUser, (req, res) => {
  return res.json({ status: "success" });
});

app.get("/logout", (req, res) => {
  res.clearCookie('token');
  res.json({status:'success'});
});

/* Start User */
app.get("/user", async (req, res) => {
  const users = await getUser();
  res.send(users);
});

app.get(`/user/:id`, async (req, res) => {
  const id = req.params.id;
  const getUser = await getUserById(id);
  res.send(getUser);
});
/*End of User*/

/*Start Post*/
app.get("/postbyid/:id",async(req,res)=>{
  const post_id = req.params.id;
  const post = await getPostByID(post_id);
  res.send(post);
})
app.put('/post/:id',async(req, res)=>{
  const postId = req.params.id;
  const {title, imageURL, content, category_id, links} = req.body;
  await updatePost(title, imageURL, content, category_id, links, postId);
  res.json({status:'success'})
})
app.get(`/delete-post/:id`, async (req, res) => {
  const id = req.params.id;
  await deletePostById(id);
  res.json({status:true});
});

app.get("/all-post", async (req, res) => {
  const posts = await getAllPost();
  res.send(posts);
});

app.post("/create-post", async (req, res) => {
  const { user_id, title, imageURL, content, referencesURL, category_id } =
    req.body;

  const createdPost = await writePost(
    user_id,
    title,
    imageURL,
    content,
    referencesURL,
    category_id
  );

  res.status(201).send(createdPost);
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
      const user = { name: username };
      const accessToken = jwt.sign(user, "jwt-token-key", {
        expiresIn: "1d",
      });
      res.cookie("token", accessToken);
      res.status(201).send(newRegistration);
    }
  });
});
/* End of Auth */

app.use((err, req, res, next) => {
  console.err(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Server is running on 8080");
});
