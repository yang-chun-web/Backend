import jwt from "jsonwebtoken";

export const jwtMiddleware = (req, res, next) => {
  const token = req.cookies["Access_Token"];
  if (!token) next();
  try {
    const checkUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = checkUser;
    return next();
  } catch {
    return next();
  }
};
