import Match from "../models/Match.js";

export const createMatch = async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMatches = async (req, res) => {
  try {
    const matches = await Match.find()
      .populate("teamA", "name")
      .populate("teamB", "name")
      .populate("tournament", "name");

    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate("teamA", "name")
      .populate("teamB", "name")
      .populate("tournament", "name");

    res.json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};