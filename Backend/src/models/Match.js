import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament"
  },
  teamA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"
  },
  teamB: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"
  },
  date: Date,
  status: {
    type: String,
    enum: ["upcoming", "live", "completed"],
    default: "upcoming"
  }
}, { timestamps: true });

export default mongoose.model("Match", matchSchema);