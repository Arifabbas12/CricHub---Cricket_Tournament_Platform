import { useEffect, useState } from "react";
import API from "../services/api";
import TournamentCard from "../components/TournamentCard";
import BackButton from "../components/BackButton";
const MyTournaments = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/tournaments/my")
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
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
        {/* 🏆 HEADER */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center tracking-wide">
          🏆 My Tournaments
        </h1>

        {/* 🌀 LOADING */}
        {loading ? (
          <p className="text-center text-lg animate-pulse">
            Loading tournaments...
          </p>
        ) : data.length === 0 ? (
          // ❌ EMPTY STATE
          <div className="flex flex-col items-center justify-center mt-20">
            <h2 className="text-xl mb-2">No tournaments yet 😢</h2>
            <p className="opacity-70">Create your first tournament now!</p>
          </div>
        ) : (
          // 📦 GRID
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {data.map((t, index) => (
              <div
                key={t._id}
                className="transform transition duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TournamentCard tournament={t} />
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default MyTournaments;