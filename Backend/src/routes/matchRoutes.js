import express from "express";
import { createMatch, getMatches, getMatchById } from "../controllers/matchController.js";

const router = express.Router();

router.post("/", createMatch);
router.get("/", getMatches);
router.get("/:id", getMatchById);

export default router;