import express from "express";
import {
  registerTeam,
  getTeamsByTournament,
  deleteTeam,
  updateTeam,
  getTeamById,
  getMyTeams
} from "../controllers/teamController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register Team
router.post("/", protect, registerTeam);

// Get Teams by Tournament
router.get("/:tournamentId", getTeamsByTournament);

router.delete("/:id", protect, deleteTeam);

router.put("/:id", protect, updateTeam);

router.get("/:id", protect, getTeamById);

router.get("/my", protect, getMyTeams);

export default router;