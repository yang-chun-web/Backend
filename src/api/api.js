import express from "express";
import { signup, login } from "../controllers/userController";
import { textRegist } from "../controllers/boardController";

const api = express.Router();
api.post("/login", login);
api.post("/signup", signup);
api.post("/textRegist", textRegist);

export default api;
