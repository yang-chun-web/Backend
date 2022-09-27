import express from "express";
import { signup, login, logout, check } from "../controllers/userController";
import { write, view, detail } from "../controllers/boardController";
import { jwtMiddleware } from "../middlewares";

const api = express.Router();
api.route("/login").post(login);
api.route("/signup").post(signup);
api.route("/logout").post(logout);
api.route("/check").all(jwtMiddleware).get(check);

api.route("/write").all(jwtMiddleware).post(write);
api.route("/view").get(view);
api.route("/detail/:id").get(detail);

export default api;
