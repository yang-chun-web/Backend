import Board from "../models/Board";

export const createText = async (req, res) => {
  const { title, content } = req.body;
  const { _id } = req.user;
  await Board.create({
    title,
    content,
    writer: _id,
  });
  return res.send("Regist Text");
};
