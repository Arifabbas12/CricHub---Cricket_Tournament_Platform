import { useEffect, useState } from "react";
import API from "../services/api";
import ScoreCard from "../components/ScoreCard";

const ScoreBoard = ({ matchId }) => {
  const [score, setScore] = useState(null);
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scoreRes, matchRes] = await Promise.all([
          API.get(`/score/${matchId}`),
          API.get(`/matches/${matchId}`)
        ]);

        setScore(scoreRes.data);
        setMatch(matchRes.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [matchId]);

  return (
    <div className="min-h-screen relative overflow-hidden text-white p-6">

      {/* 🔥 BACKGROUND */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]" />

      {/* 🏏 HEADER */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        📊 Live Scoreboard
      </h2>

      {/* 🌀 LOADING */}
      {loading ? (
        <p className="text-center animate-pulse">
          Loading score...
        </p>
      ) : !score || !match ? (
        <p className="text-center">
          No score available 😢
        </p>
      ) : (
        <div className="flex justify-center">
          <ScoreCard score={score} match={match} />
        </div>
      )}

    </div>
  );
};

export default ScoreBoard;