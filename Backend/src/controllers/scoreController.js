import Score from "../models/Score.js";

export const updateScore = async (req, res) => {
  try {
    const score = await Score.findOneAndUpdate(
      { match: req.params.matchId },
      req.body,
      { new: true, upsert: true }
    );

    res.json(score);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getScore = async (req, res) => {
  const score = await Score.findOne({ match: req.params.matchId });
  res.json(score);
};