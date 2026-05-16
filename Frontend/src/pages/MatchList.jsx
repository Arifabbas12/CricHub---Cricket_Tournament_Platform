import { useEffect, useState } from "react";
import API from "../services/api";
import MatchCard from "../components/MatchCard";

const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  API.get("/matches")
    .then(res => {
      console.log("MATCHES FRONTEND:", res.data); // 👈 check
      setMatches(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
    });
}, []);

  return (
    <div className="min-h-screen relative overflow-hidden text-white p-6">

      {/* 🔥 BACKGROUND */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]" />

      {/* 🔥 HEADER */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        🏏 Matches
      </h2>

      {/* 🌀 LOADING */}
      {loading ? (
        <p className="text-center animate-pulse">
          Loading matches...
        </p>
      ) : matches.length === 0 ? (
        <p className="text-center">
          No matches available 😢
        </p>
      ) : (
        /* 📦 GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {matches.map((m) => (
            <MatchCard key={m._id} match={m} />
          ))}

        </div>
      )}

    </div>
  );
};

export default MatchList;