import express from "express";
import { signup } from "../controllers/userController";
import { textRegist } from "../controllers/boardController";

const api = express.Router();

api.post("/signup", signup);
api.post("/textRegist", textRegist);

export default api;
