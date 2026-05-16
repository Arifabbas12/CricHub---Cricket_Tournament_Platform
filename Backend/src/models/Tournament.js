import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
  name: String,
  location: String,

  village: String,
  district: String,
  state: String,

  type: {
    type: String,
    enum: ["village", "district", "state", "open"],
    default: "open"
  },

  entryFee: Number,
  advanceFee: Number,
  prize: String,

  totalTeams: Number,
  registeredTeams: {
    type: Number,
    default: 0
  },

  date: Date,
  rules: String,

  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

export default mongoose.model("Tournament", tournamentSchema);