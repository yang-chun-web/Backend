import express from "express";
import {
  signup,
  login,
  logout,
  check,
  refresh,
} from "../controllers/userController";
import { write, view, detail } from "../controllers/boardController";
import { jwtMiddleware, tokenCheck } from "../middlewares";

const api = express.Router();
api.route("/login").post(login);
api.route("/signup").post(signup);
api.route("/logout").post(logout);
api.route("/check").all(jwtMiddleware).get(check);
api.route("/refresh").all(jwtMiddleware).post(refresh);

api.route("/write").all(tokenCheck).post(write);
api.route("/view").get(view);
api.route("/detail/:id").get(detail);

export default api;
