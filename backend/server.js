//express5 contain async error handly
import express from "express";
import { getUser, getUserById, createUser, writePost } from "./database.js";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

app.get("/user", async (req, res) => {
  const users = await getUser();

  res.send(users);
});

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const getUser = await getUserById(id);
  res.send(getUser);
});

app.post("/create-user", async (req, res) => {
  const { email, password, username } = req.body;
  const newRegistration = await createUser(email, password, username);
  res.status(201).send(newRegistration);
});

app.post("/create-post",async(req, res)=>{
  const {}= req.body;
  //!we can not remmenber for long parameter
  const createdPost = await writePost();
  res.status(201).send(createdPost);
});

app.use((err, req, res, next) => {
  console.err(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Server is running on 8080");
});
