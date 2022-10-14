import Board from "../models/Board";
import User from "../models/User";

export const view = async (req, res) => {
  const writings = await Board.find().exec();
  return res.send(writings);
};

export const detail = async (req, res) => {
  const writing = await Board.findById(req.params.id);
  let writer = false;
  if (req.user) {
    writer = { writer: req.user._id === String(writing.writer) };
    console.log(writer);
    return res.status(200).send({ text: writing, writer });
  }
  return res.status(200).send({ text: writing, writer });
};

export const fileList = async (req, res) => {
  const writing = await Board.findById(req.params.id);
  console.log(writing.files[0]);
  return res.send(writing.files[0]);
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
  return res.status(200).end();
};

export const edit = async (req, res) => {
  await Board.findByIdAndUpdate(req.body._id, {
    title: req.body.title,
    contents: req.body.contents,
  });
  return res.status(200).end();
};

const uploadResult = {
  success: (status, message, data) => {
    return {
      status: status,
      success: true,
      message: message,
      data: data,
    };
  },
  fail: (status, message) => {
    return {
      status: status,
      success: false,
      message: message,
    };
  },
};

export const register = async (req, res) => {
  const { title, contents } = req.body;
  const { _id } = req.user;
  const uploadFiles = req.files;
  const path = uploadFiles.map((file) => file.path);
  try {
    const writing = await Board.create({
      title,
      contents,
      writer: _id,
      files: path,
    });
    const user = await User.findById(_id);
    console.log(_id, title, contents, path);
    user.texts.push(writing._id);
    user.save();
    res.status(200).send(uploadResult.success(200, "업로드 성공", path));
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
