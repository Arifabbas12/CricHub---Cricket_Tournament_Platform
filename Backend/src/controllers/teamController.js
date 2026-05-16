import Team from "../models/Team.js";
import Tournament from "../models/Tournament.js";
import { validateTeam } from "../utils/validation.js";
import { getIO, getUsers } from "../configs/socket.js";

// 🏏 Register Team
export const registerTeam = async (req, res) => {
  try {
    const { name, players, tournamentId } = req.body;

    // 1️⃣ Tournament check
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    // 2️⃣ Slot check
    if (tournament.registeredTeams >= tournament.totalTeams) {
      return res.status(400).json({ message: "Tournament is full" });
    }

    // 3️⃣ Rule validation
    const isValid = validateTeam(players, tournament);
    if (!isValid) {
      return res.status(400).json({
        message: `All players must belong to same ${tournament.type}`
      });
    }

    // 4️⃣ Create Team
    const team = await Team.create({
      name,
      captain: req.user.id,
      players,
      tournament: tournamentId
    });

    // 5️⃣ Update tournament count
    tournament.registeredTeams += 1;
    await tournament.save();

    // 🔔 6️⃣ SEND NOTIFICATION (MAIN PART 🔥)
    const io = getIO();
    const users = getUsers();

    const organizerId = tournament.organizer?.toString();

    if (users[organizerId]) {
      io.to(users[organizerId]).emit("newNotification", {
        message: `🔥 ${name} team joined your tournament`
      });

        io.to(users[organizerId]).emit("newNotification", {
        message: `❌ A team left your tournament`
});
    }


    res.status(201).json({
      message: "Team registered successfully",
      team
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 📋 Get Teams by Tournament
export const getTeamsByTournament = async (req, res) => {
  try {
    const teams = await Team.find({
      tournament: req.params.tournamentId
    }).populate("captain", "name phone");

    res.status(200).json(teams);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // 🔐 Only captain delete kare
    if (team.captain.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // 🗑 Delete team
    await team.deleteOne();

    // 🔥 UPDATE tournament count
    const tournament = await Tournament.findById(team.tournament);

    if (tournament) {
      tournament.registeredTeams = Math.max(
        0,
        (tournament.registeredTeams || 0) - 1
      );

      await tournament.save();
    }

    res.json({ message: "Team deleted & count updated 🔥" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (team.captain.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json(team);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyTeams = async (req, res) => { 
  try { 
    const teams = await Team.find({ captain: req.user.id })
    .populate("tournament", "name"); res.json(teams);

 } catch (err) {
   res.status(500).json({ message: err.message });
   
 } 
};