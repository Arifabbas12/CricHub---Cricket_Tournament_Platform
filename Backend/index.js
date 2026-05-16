import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./src/routes/authRoutes.js";
import tournamentRoutes from "./src/routes/tournamentRoutes.js";
import teamRoutes from "./src/routes/teamRoutes.js";
import cors from "cors";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import http from "http";
import { initSocket } from "../Backend/src/configs/socket.js";
import matchRoutes from "./src/routes/matchRoutes.js";
import scoreRoutes from "./src/routes/scoreRoutes.js"

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/scores", scoreRoutes);


const server = http.createServer(app);

// 🔥 initialize socket
initSocket(server);

// ❗ replace app.listen
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

