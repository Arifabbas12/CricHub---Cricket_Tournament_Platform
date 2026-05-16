import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MatchCard = ({ match }) => {
  const navigate = useNavigate();
  if (!match) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(`/match/${match._id}`)} // 🔥 navigation added
      className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl text-white shadow-xl min-w-[280px] cursor-pointer hover:shadow-2xl transition"
    >
      {/* 🏏 Teams */}
      <h2 className="text-xl font-bold text-center mb-3">
        {match.teamA?.name || "Team A"} vs {match.teamB?.name || "Team B"}
      </h2>

      {/* 📅 Date */}
      <p className="text-center text-sm opacity-80 mb-3">
        {match.date
          ? new Date(match.date).toLocaleString()
          : "No Date"}
      </p>

      {/* 🔥 Status */}
      <div className="flex justify-center">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            match.status === "live"
              ? "bg-red-500"
              : match.status === "completed"
              ? "bg-green-500"
              : "bg-yellow-500"
          }`}
        >
          {match.status?.toUpperCase() || "UPCOMING"}
        </span>
      </div>
    </motion.div>
  );
};

export default MatchCard;