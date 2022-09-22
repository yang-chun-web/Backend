import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now() },
  texts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Board" }],
});

const User = mongoose.model("User", userSchema);

export default User;