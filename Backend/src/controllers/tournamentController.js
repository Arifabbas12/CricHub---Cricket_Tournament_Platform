import Tournament from "../models/Tournament.js";
import Team from "../models/Team.js";


// ➕ Create Tournament
export const createTournament = async (req, res) => {
  try {
    const {
      name,
      location,
      village,
      district,
      state,
      type,
      entryFee,
      advanceFee,
      prize,
      totalTeams,
      date,
      rules
    } = req.body;

    const tournament = await Tournament.create({
      name,
      location,
      village,
      district,
      state,
      type,
      entryFee,
      advanceFee,
      prize,
      totalTeams,
      date,
      rules,
      organizer: req.user.id
    });

    res.status(201).json({
      message: "Tournament created successfully",
      tournament
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTournaments = async (req, res) => {
  try {
    const { search, location, type, minFee, maxFee } = req.query;

    let filter = {};

    // 🔍 Search by name
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // 📍 Location filter
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    // 🔖 Type filter
    if (type) {
      filter.type = type;
    }

    // 💰 Fee filter
    if (minFee || maxFee) {
      filter.entryFee = {};
      if (minFee) filter.entryFee.$gte = Number(minFee);
      if (maxFee) filter.entryFee.$lte = Number(maxFee);
    }

    const tournaments = await Tournament.find(filter);

    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🔍 Get Single Tournament

export const getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
      .populate("organizer", "name phone"); // 👤 organizer info

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    // 🔥 Fetch teams + captain info
    const teams = await Team.find({ tournament: tournament._id })
      .populate("captain", "name phone");

    // 🔥 Send clean response
    res.status(200).json({
      tournament,
      teams,
      totalTeamsRegistered: teams.length // 📊 extra useful data
    });

  } catch (error) {
    console.error("GET TOURNAMENT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return res.status(404).json({ message: "Not found" });
    }

    // 🔐 Only organizer delete kare
    if (tournament.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await tournament.deleteOne();

    res.json({ message: "Tournament deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return res.status(404).json({ message: "Not found" });
    }

    // 🔐 Only organizer update kare
    if (tournament.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await Tournament.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find({
      organizer: req.user.id
    });

    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};