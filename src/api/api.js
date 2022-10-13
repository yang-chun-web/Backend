import express from "express";
import { signup, login, logout, refresh } from "../controllers/userController";
import {
  write,
  view,
  detail,
  remove,
  edit,
  fileList,
  test,
} from "../controllers/boardController";
import { filesUpload, jwtMiddleware, tokenCheck } from "../middlewares";

const api = express.Router();
api.route("/login").post(login);
api.route("/signup").post(signup);
api.route("/logout").post(logout);
api.route("/refresh").all(jwtMiddleware).post(refresh);

api.route("/write").all(tokenCheck).post(write);
api.route("/view").get(view);
api.route("/detail/:id").all(tokenCheck).get(detail);
api.route("/files/:id").all(tokenCheck).get(fileList);
api.route("/edit").put(edit);
api.route("/remove").all(tokenCheck).post(remove);

api.route("/test").all(tokenCheck).post(filesUpload, test);

export default api;
