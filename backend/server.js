import {
  updatePost
} from "./database.js";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { CreatePost, DeletePostById, GetAllPost, GetPostById, GetUser, GetUserById, Registeration, TokenVerified, UpdatePostById, UserLogin, UserLogout } from "./controllers/index.js";
import { verifyUser } from "./middleware/index.js";

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

app.get("/", verifyUser, TokenVerified);

app.get("/logout", UserLogout);

app.get("/user", GetUser);
app.get(`/user/:id`, GetUserById);

app.get("/postbyid/:id",GetPostById);
app.put('/updatepostbyid/:id',UpdatePostById);

app.get("/delete-post/:id", DeletePostById);
app.get("/all-post", GetAllPost);
app.post("/create-post", CreatePost);
app.post("/login", UserLogin);
app.post("/registration", Registeration);

app.use((err, req, res, next) => {
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.clear();
  console.log("Server is running on 8080");
});
