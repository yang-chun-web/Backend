export const textRegist = async (req, res) => {
  const { title, content } = req.body;
  await Board.create({
    title,
    content,
  });
  return res.send("Regist Text");
};
