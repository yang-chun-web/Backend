export const signup = async (req, res) => {
  const { email, password } = req.body;
  await User.create({
    email,
    password,
  });
  return res.send("Sign Up");
};
