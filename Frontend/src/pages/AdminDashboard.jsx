import { useEffect, useState } from "react";
import API from "../services/api";
import BackButton from "../components/BackButton";
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    tournaments: 0,
    teams: 0
  });

const fetchStats = async () => {
  try {
    const [tRes, teamRes] = await Promise.all([
      API.get("/tournaments"),
      API.get("/teams")
    ]);

    setStats({
      tournaments: tRes.data.length,
      teams: teamRes.data.length
    });
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchStats();

  const interval = setInterval(() => {
    fetchStats();
  }, 5000); // every 5 sec

  return () => clearInterval(interval);
}, []);



  return (
    <div className="min-h-screen relative overflow-hidden text-white">

      {/* 🔥 BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]" />

      {/* 🔥 BLOBS */}
      <div className="absolute w-[400px] h-[400px] bg-purple-500 opacity-30 rounded-full blur-3xl top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500 opacity-30 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      {/* 🔥 CONTENT */}
      <div className="relative z-10 p-6">
        
              {/* 🔥 BACK-Button */}
        <BackButton />
        {/* 🧠 HEADER */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          📊 Admin Dashboard
        </h1>

        {/* 📦 STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* 🏏 Tournaments */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-105 transition duration-300">

            <div className="flex justify-between items-center">
              <h2 className="text-lg">Total Tournaments</h2>
              <span className="text-3xl">🏏</span>
            </div>

            <p className="text-4xl font-bold mt-4">
              {stats.tournaments}
            </p>

            <p className="text-sm opacity-70 mt-2">
              Active tournaments in system
            </p>

          </div>

          {/* 👥 Teams */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-105 transition duration-300">

            <div className="flex justify-between items-center">
              <h2 className="text-lg">Total Teams</h2>
              <span className="text-3xl">👥</span>
            </div>

            <p className="text-4xl font-bold mt-4">
              {stats.teams}
            </p>

            <p className="text-sm opacity-70 mt-2">
              Registered teams across tournaments
            </p>

          </div>

        </div>

        {/* 🔥 EXTRA SECTION (Future Ready) */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white/10 backdrop-blur p-5 rounded-xl text-center">
            <h3 className="text-lg">💰 Revenue</h3>
            <p className="text-2xl font-bold mt-2">₹0</p>
          </div>

          <div className="bg-white/10 backdrop-blur p-5 rounded-xl text-center">
            <h3 className="text-lg">📈 Growth</h3>
            <p className="text-2xl font-bold mt-2">+12%</p>
          </div>

          <div className="bg-white/10 backdrop-blur p-5 rounded-xl text-center">
            <h3 className="text-lg">🔥 Active Users</h3>
            <p className="text-2xl font-bold mt-2">100+</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;