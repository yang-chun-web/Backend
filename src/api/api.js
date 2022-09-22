import express from "express";
import { signup } from "../controllers/userController";
import { textRegist } from "../controllers/boardController";

const api = express.Router();

api.post("/api/signup", signup);
api.post("/api/textRegist", textRegist);

export default api;
