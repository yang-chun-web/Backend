import jwt from "jsonwebtoken";
import multer from "multer";

export const jwtMiddleware = (req, res, next) => {
  const token = req.cookies["Refresh_Token"];
  if (!token) next();
  try {
    const checkRefreshToken = jwt.verify(token, process.env.JWT_SECRET);
    req.refreshToken = checkRefreshToken;
    return next();
  } catch {
    return next();
  }
};

export const tokenCheck = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) next();
  try {
    const checkToken = jwt.verify(token, process.env.JWT_ACCESS);
    req.user = checkToken;
    return next();
  } catch {
    return next();
  }
};

const fileUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  limits: { fileSize: 3 * 1024 * 1024 },
});

export const filesUpload = fileUpload.array("file", 5);
