import Board from "../models/Board";
import User from "../models/User";

export const write = async (req, res) => {
  const { title, contents } = req.body;
  const { _id } = req.user;
  const writing = await Board.create({
    title,
    contents,
    writer: _id,
  });
  const user = await User.findById(_id);
  user.texts.push(writing._id);
  user.save();
  return res.send("Regist Text");
};

export const view = async (req, res) => {
  const writings = await Board.find().exec();
  return res.send(writings);
};

export const detail = async (req, res) => {
  const writing = await Board.findById(req.params.id);
  return res.status(200).send(writing);
};

export const remove = async (req, res) => {
  const findUser = await User.findById(req.user._id);
  const findText = await Board.findById(req.body.id);
  if (String(findText.writer) !== String(findUser._id)) {
    return res.status(403).end();
  }
  const texts = findUser.texts.filter(
    (text) => String(text) !== String(findText._id)
  );
  findUser.texts = texts;
  findUser.save();
  await Board.findByIdAndDelete(req.body.id);
  return res.end();
};
