import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import ScoreBoard from "../components/ScoreCard";

const MatchDetail = () => {
  const { id } = useParams();

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/matches/${id}`)
      .then(res => {
        setMatch(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-white text-center mt-10">Loading...</p>;
  }

  if (!match) {
    return <p className="text-white text-center mt-10">Match not found 😢</p>;
  }

  return (
    <div className="min-h-screen text-white p-6 relative overflow-hidden">

      {/* 🔥 BACKGROUND */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]" />

      {/* 🏏 MATCH INFO */}
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold text-center mb-4">
          {match.teamA?.name} vs {match.teamB?.name}
        </h1>

        <p className="text-center mb-2">
          📅 {new Date(match.date).toLocaleString()}
        </p>

        <p className="text-center mb-4">
          🏆 Tournament: {match.tournament?.name}
        </p>

        <div className="flex justify-center mb-4">
          <span className={`px-4 py-1 rounded-full font-semibold
            ${match.status === "live" ? "bg-red-500" :
              match.status === "completed" ? "bg-green-500" :
              "bg-yellow-500"}
          `}>
            {match.status.toUpperCase()}
          </span>
        </div>

      </div>

      {/* 📊 SCOREBOARD */}
      <div className="mt-8 flex justify-center">
        <ScoreBoard matchId={match._id} />
      </div>

    </div>
  );
};

export default MatchDetail;