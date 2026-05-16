import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: String,
  village: String,
  district: String,
  state: String,
});

const teamSchema = new mongoose.Schema({
  name: String,

  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  players: [playerSchema],

  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament"
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending"
  }

}, { timestamps: true });

export default mongoose.model("Team", teamSchema);