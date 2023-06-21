import express from "express";
import cookieParser from "cookie-parser";
import api from "./api/api";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["POST", "PUT", "GET", "DELETE"],
  })
);
app.use(cookieParser());

app.use("/api", api);
export default app;
