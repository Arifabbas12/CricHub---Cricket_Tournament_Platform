import express from "express";
import {
  createTournament,
  getAllTournaments,
  getTournamentById,
  deleteTournament,
  updateTournament,
  getMyTournaments
} from "../controllers/tournamentController.js";
import { protect } from "../middlewares/authMiddleware.js";


const router = express.Router();

// Create Tournament (Protected)
router.post("/", protect, createTournament);

// Get All
router.get("/", getAllTournaments);

// Get Single
router.get("/:id", getTournamentById);

router.delete("/:id", protect, deleteTournament);

router.put("/:id", protect, updateTournament);

router.get("/my", protect, getMyTournaments);

export default router;