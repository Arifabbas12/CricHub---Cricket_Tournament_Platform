import { useEffect, useState } from "react";
import API from "../services/api";
import TournamentCard from "../components/TournamentCard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SearchFilter from "../components/SearchFilter";

const Home = () => {
  const [tournaments, setTournaments] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔥 FILTER STATES
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // 🔥 FETCH WITH FILTER
  const fetchTournaments = async () => {
    try {
      const res = await API.get("/tournaments", {
        params: {
          search,
          location,
          type
        }
      });

      setTournaments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 AUTO FETCH (debounce)
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchTournaments();
    }, 400);

    return () => clearTimeout(delay);
  }, [search, location, type]);

  const handleDeleteTournament = (id) => {
    setTournaments(prev => prev.filter(t => t._id !== id));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* 🔥 BACKGROUND */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]" />

      {/* 🔥 BLOBS */}
      <div className="absolute w-[400px] h-[400px] bg-purple-500 opacity-30 rounded-full blur-3xl animate-pulse top-[-120px] left-[-120px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500 opacity-30 rounded-full blur-3xl animate-pulse bottom-[-120px] right-[-120px]" />

      {/* 🔥 NAVBAR */}
      <div className="relative z-30">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      {/* 🔥 SIDEBAR */}
      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />

      {/* 🔥 OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 z-20"
        />
      )}

      {/* 🔥 MAIN CONTENT */}
      <div className="relative z-10 px-4 md:px-8 py-6">

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
          <span className="text-green-600">🏏 Cric</span> 
          <span className="text-blue-600">Hub</span>
        </h1>

        {/* 🔍 SEARCH FILTER COMPONENT */}
        <SearchFilter
          search={search}
          setSearch={setSearch}
          location={location}
          setLocation={setLocation}
          type={type}
          setType={setType}
        />

        {/* 📦 GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.length === 0 ? (
            <p className="text-white text-center col-span-full">
              No tournaments found 😢
            </p>
          ) : (
            tournaments.map(t => (
              <TournamentCard
                key={t._id}
                tournament={t}
                onDelete={handleDeleteTournament}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Home;