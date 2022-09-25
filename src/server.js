import express from "express";
import cookieParser from "cookie-parser";
import api from "./api/api";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", api);
export default app;
