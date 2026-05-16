import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

const TournamentCard = ({ tournament }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  
  const handleJoin = () => {
    navigate(`/register-team/${tournament._id}`);
  };

  const handleEdit = () => {
    navigate(`/edit/${tournament._id}`);
  };

  const handleView = () => {
  navigate(`/tournament/${tournament._id}`);
};

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this tournament?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/tournaments/${tournament._id}`);
      alert("Deleted Successfully 🔥");

      // simple refresh
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg hover:scale-105 transition duration-300">

      {/* 🔥 3-dot menu (Top Right) */}
      <div className="absolute top-3 right-3">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-xl font-bold"
        >
          ⋮
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg z-10">
            <button
              onClick={handleEdit}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100"
            >
              ✏️ Edit
            </button>

            <button
              onClick={handleDelete}
              className="block w-full text-left px-3 py-2 hover:bg-red-100"
            >
              🗑 Delete
            </button>

            <button
             onClick={handleView}
             className="mt-2 w-full bg-white text-black py-2 rounded"
           >
            View Details
        </button>
          </div>
        )}
      </div>

      {/* 🏏 Title */}
      <h2 className="text-2xl font-bold mb-1">
        {tournament.name}
      </h2>

      {/* 📍 Location */}
      <p className="text-sm opacity-90 mb-3">
        {tournament.location}
      </p>

      {/* 🔖 Type + Entry Fee */}
      <div className="flex justify-between items-center mb-3">
        <span className="bg-white text-black px-3 py-1 rounded text-sm font-semibold">
          {tournament.type?.toUpperCase()}
        </span>

        <span className="font-bold text-lg">
          ₹{tournament.entryFee || 0}
        </span>
      </div>

      {/* 📊 Details */}
      <div className="text-sm space-y-1 mb-4">
        <p>🏆 Prize: {tournament.prize || "N/A"}</p>
        <p>
          👥 Teams: {tournament.registeredTeams || 0}/{tournament.totalTeams || 0}
        </p>
        <p>
          📅 Date:{" "}
          {tournament.date
            ? new Date(tournament.date).toDateString()
            : "Not set"}
        </p>
      </div>

      {/* 🔘 Join Button */}
      <button
        onClick={handleJoin}
        className="mt-2 w-full bg-black py-2 rounded hover:bg-gray-800 transition"
      >
        Join Tournament
      </button>

    </div>
  );
};

export default TournamentCard;