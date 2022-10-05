import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  contents: { type: String },
  createdAt: { type: Date, required: true, default: Date.now() },
  updatedAt: { type: Date, defualt: Date.now() },
  writer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Board = mongoose.model("Board", boardSchema);
export default Board;
