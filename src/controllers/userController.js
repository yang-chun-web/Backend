import User from "../models/User";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).end();
    } else {
      await User.create({ email, password });
      return res.status(200).end();
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).end();
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      const samePassword = await bcrypt.compare(password, user.password);
      if (!samePassword) {
        return res.status(401).send("Password Error");
      }
      const token = user.generateToken();
      res.cookie("Access_Token", token, { maxAge: 86400000, httpOnly: true });
      console.log("⭕ Login Success ✨✨ ");
      return res.status(200).end();
    } else {
      return res.status(401).send("Cant find id");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("Access_Token");
  return res.status(204).send("Logout");
};

export const check = async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401).send("Unauthorized");
  }
  return res.status(200).send(user);
};
