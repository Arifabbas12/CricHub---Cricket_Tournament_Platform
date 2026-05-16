import { motion } from "framer-motion";

const ScoreCard = ({ score, match }) => {
  if (!score) {
    return (
      <div className="text-white text-center">
        No score available 😢
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-purple-500 to-blue-600 p-5 rounded-2xl text-white shadow-xl"
    >
      {/* 🏏 Teams */}
      <h2 className="text-xl font-bold text-center mb-4">
        {match.teamA?.name} vs {match.teamB?.name}
      </h2>

      {/* 📊 Score */}
      <div className="flex justify-between text-lg font-semibold mb-3">
        <span>{match.teamA?.name}</span>
        <span>{score.teamAScore || 0}</span>
      </div>

      <div className="flex justify-between text-lg font-semibold mb-3">
        <span>{match.teamB?.name}</span>
        <span>{score.teamBScore || 0}</span>
      </div>

      {/* ⏱ Overs */}
      <p className="text-center mb-2">
        ⏱ Overs: {score.overs || 0}
      </p>

      {/* 🏆 Winner */}
      {score.winner && (
        <p className="text-center font-bold text-green-300">
          🏆 Winner: {score.winner}
        </p>
      )}
    </motion.div>
  );
};

export default ScoreCard;