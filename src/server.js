import express from "express";
import api from "./api/api";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    cookie: { maxAge: Number(process.env.ONE_DAY) },
  })
);
app.use("/api", api);
export default app;
