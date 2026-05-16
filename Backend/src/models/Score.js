import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match"
  },
  teamAScore: Number,
  teamBScore: Number,
  overs: Number,
  winner: String
}, { timestamps: true });

export default mongoose.model("Score", scoreSchema);