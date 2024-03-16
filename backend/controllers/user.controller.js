import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { checkEmailForLogin, getUser, getUserById } from "../database.js";

const salt = 10;

export const GetUser = async (req, res) => {
  const users = await getUser();
  res.send(users);
};

export const GetUserById = async (req, res) => {
  const id = req.params.id;
  const getUser = await getUserById(id);
  res.send(getUser);
};
export const UserLogin = async (req, res) => {
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
};

export const Registeration = (req, res) => {
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
};
export const UserLogout = (req, res) => {
  res.clearCookie("token");
  res.json({ status: "success" });
};

export const TokenVerified = (req, res) => {
  return res.json({ status: "success" });
};
