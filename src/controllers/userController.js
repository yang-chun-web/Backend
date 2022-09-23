import User from "../models/User";

export const signup = async (req, res) => {
  const { email, password } = req.body;
  await User.create({
    email,
    password,
  });
  return res.send("Sign Up");
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("Wrong Email Alert!");
  }
  if (password !== user.password) {
    return res.status(400).send("Wrong Password Alert!");
  }
  req.session.user = user;
  req.session.loggedIn = true;
  console.log("⭕ Login Success ✨✨ ");
  return res.send({ loggedIn: req.session.loggedIn });
};

export const logout = (req, res) => {
  req.session.user = null;
  res.locals.loggedInUser = req.session.user;
  req.session.loggedIn = false;
};
