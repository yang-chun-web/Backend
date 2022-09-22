import express from "express";
import "./db";
import Board from "./models/Board";
import User from "./models/User";

const app = express();
const PORT = 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const signup = async (req, res) => {
  const { email, password } = req.body;
  await User.create({
    email,
    password,
  });
  return res.send("Sign Up");
};

const textRegist = async (req, res) => {
  const { title, content } = req.body;
  await Board.create({
    title,
    content,
  });
  return res.send("Regist Text");
};

app.post("/api/signup", signup);
app.post("/api/textRegist", textRegist);

const handleListen = () => {
  console.log(`✅ Server run Port:${PORT} 🚀`);
};
app.listen(PORT, handleListen);
