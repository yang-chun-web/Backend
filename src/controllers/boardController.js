import Board from "../models/Board";
import User from "../models/User";

export const writeOnTheBoard = async (req, res) => {
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

export const boardView = async (rea, res) => {
  const writings = await Board.find().exec();
  console.log(writings);
  return res.send(writings);
};
