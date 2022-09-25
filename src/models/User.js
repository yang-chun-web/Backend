import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now() },
  texts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Board" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { _id: this.id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

export default User;
