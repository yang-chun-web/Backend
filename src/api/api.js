import express from "express";
import { signup, login, logout } from "../controllers/userController";
import { textRegist } from "../controllers/boardController";
import { publicOnlyMiddleware } from "../middlewares";

const api = express.Router();
api.route("/login").post(login);
api.route("/signup").all(publicOnlyMiddleware).post(signup);
api.route("/logout").get(logout);
api.post("/textRegist", textRegist);

export default api;
