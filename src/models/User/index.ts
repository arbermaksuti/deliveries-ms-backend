import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import Base from "../Base";

const UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  password: {
    type: String,
    select: false,
  },
  phoneNumber: String,
  role: {
    type: Number,
    enum: [0, 1, 2, 3, 4], // 1 -> admin, 2 -> sales manager, 3 -> kitchen, 4 -> postman
  },
  ...Base,
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model("User", UserSchema);
