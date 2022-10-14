import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
      res.cookie("Refresh_Token", refreshToken, {
        maxAge: 86400000,
        httpOnly: true,
      });
      console.log("⭕ Login Success ✨✨ ");
      return res.status(200).send(accessToken);
    } else {
      return res.status(401).send("Cant find id");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("Refresh_Token");
  return res.status(204).send("Logout");
};

export const refresh = async (req, res) => {
  const { refreshToken } = req;
  if (!refreshToken) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const { token } = req.body;
  const checkUser = jwt.verify(token, process.env.JWT_ACCESS);
  const { _id } = checkUser;
  const user = await User.findOne({ _id });
  const accessToken = user.generateAccessToken();
  console.log("💥 Token Regenerated ");
  return res.status(200).send(accessToken);
};
