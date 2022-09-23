import session from "express-session";
import User from "../models/User";

export const signup = async (req, res) => {
  const { email, password } = req.body;
  await User.create({
    email,
    password,
  });
  return res.send("Sign Up");
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).end();
  }
  req.session.user = user;
  req.session.loggedIn = true;
  console.log(req.session);
  console.log("⭕ Login Success ✨✨ ");
  return res.send(req.session.loggedIn);
};
