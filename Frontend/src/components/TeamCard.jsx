import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const TeamCard = ({ team, onDelete }) => {
  const captainId = team.captain?._id;
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  // 🗑 Delete
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this team?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/teams/${team._id}`);
      alert("Team deleted 🔥");

      onDelete(team._id); // 🔥 UI update without reload
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  // ✏️ Edit
  const handleEdit = () => {
    navigate(`/edit-team/${team._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4 }}
      className="relative min-w-[300px] bg-white/20 backdrop-blur-lg text-white rounded-2xl p-5 shadow-xl"
    >

      {/* 🔥 3-dot menu */}
      <div className="absolute top-2 right-2">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-xl font-bold"
        >
          ⋮
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-32 z-10">
            <button
              onClick={handleEdit}
              className="block w-full px-3 py-2 hover:bg-gray-100"
            >
              ✏️ Edit
            </button>

            <button
              onClick={handleDelete}
              className="block w-full px-3 py-2 hover:bg-red-100"
            >
              🗑 Delete
            </button>
          </div>
        )}
      </div>

      {/* 🏏 Team Name */}
      <h2 className="text-xl font-bold mb-2">
        {team.name}
      </h2>

      {/* 📍 Location */}
      <p className="text-sm opacity-80 mb-3">
        📍 {team.players[0]?.village}, {team.players[0]?.district}
      </p>

      {/* 👑 Captain Highlight */}
      <div className="mb-3 p-2 bg-blue-500 text-black rounded-lg font-semibold flex items-center gap-2">

        <motion.span
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
        >
          👑
        </motion.span>

        Captain: {team.captain?.name || "Unknown"}
      </div>

      {/* 👥 Players */}
      <div>
        <p className="font-semibold mb-1">Players:</p>

        <ul className="space-y-1">
          {team.players.map((player, index) => {
            const isCaptain = player._id === captainId;

            return (
              <li
                key={index}
                className={`flex justify-between px-2 py-1 rounded ${
                  isCaptain
                    ? "bg-yellow-500/30 border border-yellow-300"
                    : "bg-white/10"
                }`}
              >
                <span>{player.name}</span>

                {isCaptain && (
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="text-yellow-300"
                  >
                    👑
                  </motion.span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

    </motion.div>
  );
};

export default TeamCard;