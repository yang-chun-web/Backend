import jwt from "jsonwebtoken";

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
