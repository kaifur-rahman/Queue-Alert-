import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    refreshToken: { type: String },
    _id: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: String,
    picture: String,
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
export default userModel;
