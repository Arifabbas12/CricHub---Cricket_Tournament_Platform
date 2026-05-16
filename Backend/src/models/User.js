import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  password: String,
  role: {
    type: String,
    enum: ["organizer", "player"],
    default: "player"
  },
  village: String,
  district: String,
  state: String,
}, { timestamps: true });

export default mongoose.model("User", userSchema);