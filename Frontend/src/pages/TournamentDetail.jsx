import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import TeamCard from "../components/TeamCard"; // 🔥 import

const TournamentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tournament, setTournament] = useState(null);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    API.get(`/tournaments/${id}`)
      .then(res => {
        console.log("DETAIL API:", res.data);
        setTournament(res.data.tournament);
        setTeams(res.data.teams);
      })
      .catch(err => {
        console.log("ERROR:", err);
      });
  }, [id]);

  const handleDeleteTeam = (id) => {
  setTeams(prev => prev.filter(t => t._id !== id));
};

  if (!tournament) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h2 className="text-xl">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-green-400 flex flex-col items-center p-4">

      {/* 🔥 Poster Card */}
      <div className="bg-white/10 backdrop-blur-lg text-white rounded-3xl shadow-2xl p-8 max-w-md w-full mb-6">

        <h1 className="text-3xl font-extrabold text-center mb-2">
          {tournament.name}
        </h1>

        <p className="text-center text-sm opacity-80 mb-4">
          📍 {tournament.location}
        </p>

        <div className="flex justify-center mb-4">
          <span className="bg-white text-black px-4 py-1 rounded-full font-semibold">
            {tournament.type.toUpperCase()}
          </span>
        </div>

        <div className="text-center text-2xl font-bold mb-4">
          ₹{tournament.entryFee}
        </div>

        <div className="space-y-2 text-sm mb-6">
          <p>🏆 Prize: <span className="font-semibold">{tournament.prize}</span></p>

          <p>
            👥 Teams:{" "}
            <span className="font-semibold">
              {teams.length}/{tournament.totalTeams}
            </span>
          </p>

          <p>
            📅 Date:{" "}
            <span className="font-semibold">
              {tournament.date
                ? new Date(tournament.date).toDateString()
                : "No date"}
            </span>
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate(`/register-team/${tournament._id}`)}
            className="w-full bg-black py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Join Tournament
          </button>

          <button
            onClick={() => navigate("/home")}
            className="w-full bg-white text-black py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Back to Home
          </button>
        </div>
      </div>

      {/* 👥 TEAMS SECTION 🔥 */}
      <div className="w-full">

        <h2 className="text-white text-xl font-bold mb-3">
          Registered Teams 👇
        </h2>

        {teams.length === 0 ? (
          <p className="text-white">No teams registered yet 😢</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">

        {teams.map(team => (
          <div key={team._id} className="min-w-[300px]">
           <TeamCard 
           team={team}
           onDelete={handleDeleteTeam} 
            />
      </div>
  ))}

</div>
        )}

      </div>

    </div>
  );
};

export default TournamentDetail;