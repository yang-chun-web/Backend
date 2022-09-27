import express from "express";
import { signup, login, logout, check } from "../controllers/userController";
import { writeOnTheBoard, boardView } from "../controllers/boardController";
import { jwtMiddleware } from "../middlewares";

const api = express.Router();
api.route("/login").post(login);
api.route("/signup").post(signup);
api.route("/logout").post(logout);
api.route("/check").all(jwtMiddleware).get(check);

api.route("/write").all(jwtMiddleware).post(writeOnTheBoard);
api.route("/view").get(boardView);

export default api;
