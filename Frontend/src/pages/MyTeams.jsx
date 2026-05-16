import { useEffect, useState } from "react";
import API from "../services/api";
import BackButton from "../components/BackButton";

const MyTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/teams/my")
      .then((res) => {
        setTeams(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden text-white">

      {/* 🔥 BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]" />

      {/* 🔥 BLOBS */}
      <div className="absolute w-[350px] h-[350px] bg-purple-500 opacity-30 rounded-full blur-3xl top-[-100px] left-[-100px]" />
      <div className="absolute w-[350px] h-[350px] bg-blue-500 opacity-30 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      {/* 🔥 CONTENT */}
      <div className="relative z-10 p-6">

            {/* 🔥 BACK-Button */}
        <BackButton />
        
        {/* 👥 HEADER */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          👥 My Teams
        </h1>

        {/* 🌀 LOADING */}
        {loading ? (
          <p className="text-center text-lg animate-pulse">
            Loading teams...
          </p>
        ) : teams.length === 0 ? (
          // ❌ EMPTY STATE
          <div className="flex flex-col items-center justify-center mt-20">
            <h2 className="text-xl mb-2">No teams yet 😢</h2>
            <p className="opacity-70">
              Join a tournament and create your first team!
            </p>
          </div>
        ) : (
          // 📦 GRID
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {teams.map((team, index) => (
              <div
                key={team._id}
                className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl shadow-xl hover:scale-105 transition duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* 🏏 Team Name */}
                <h2 className="text-xl font-bold mb-2">
                  {team.name}
                </h2>

                {/* 🏆 Tournament */}
                <p className="text-sm opacity-80 mb-3">
                  🏆 {team.tournament?.name || "No Tournament"}
                </p>

                {/* 👥 Players Count */}
                <div className="text-sm mb-3">
                  👥 Players: {team.players?.length || 0}
                </div>

                {/* 📍 Location */}
                <p className="text-xs opacity-70">
                  📍 {team.players?.[0]?.village},{" "}
                  {team.players?.[0]?.district}
                </p>

                {/* 🔥 Footer */}
                <div className="mt-4 flex justify-between items-center text-sm">
                  <span className="bg-green-500 px-2 py-1 rounded text-black">
                    Active
                  </span>

                  <span className="opacity-70">
                    #{index + 1}
                  </span>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default MyTeams;