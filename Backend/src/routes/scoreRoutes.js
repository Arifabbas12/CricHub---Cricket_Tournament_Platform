import express from "express";
import { updateScore, getScore } from "../controllers/scoreController.js";

const router = express.Router();

router.post("/:matchId", updateScore);
router.get("/:matchId", getScore);

export default router;