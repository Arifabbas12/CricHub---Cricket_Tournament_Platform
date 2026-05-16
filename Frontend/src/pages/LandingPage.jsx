import { useNavigate } from "react-router-dom";
import frontImage from "../assets/front.png"
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full text-white ">

      {/* 🔥 HERO SECTION */}
      <section className="h-screen relative overflow-hidden">

        {/* 🖼️ IMAGE */}
        <img
          src={frontImage}
          alt="cricket"
          className="absolute inset-0 w-full h-full object-cover object-[0,30%]"
        />

        {/* 🌑 OVERLAY */}
        <div className="fixed inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" /> 

        {/* 🔝 NAVBAR */}
        <div className="fixed top-0 w-full flex justify-between items-center px-6 py-4 z-20">
          <h1 className="text-4xl font-bold">🏏<span className="text-blue-600 underline">Cric</span>
          <span className="text-green-600 underline">Hub</span></h1>

          <div className="space-x-4">
            <button onClick={() => navigate("/login")} className="hover:underline">
              Login
            </button>

            <button
              onClick={() => navigate("/")}
              className="bg-green-500 px-4 py-1 rounded"
            >
              Register
            </button>
          </div>
        </div>

        {/* 🧠 HERO CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">

          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 
           bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 
           bg-clip-text text-transparent 
           drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
           🏏 Play Like a Champion
          </h1>

          <p className="text-lg md:text-xl mb-6 max-w-2xl text-gray-200">
            Create tournaments, join teams, compete with players, and track live scores.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">

            <button
              onClick={() => navigate("/home")}
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg"
            >
              Join Tournament
            </button>

            <button
              onClick={() => navigate("/create")}
              className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-lg"
            >
              Create Tournament
            </button>

          </div>

        </div>
      </section>

      {/* 🧩 FEATURES SECTION */}
      <section className="py-16 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">

        <h2 className="text-3xl text-center font-bold mb-10">
          🚀 Features
        </h2>

        <div className="grid md:grid-cols-4 gap-6 px-6">

          {[
            { title: "Create Tournament", icon: "🏆" },
            { title: "Join Teams", icon: "👥" },
            { title: "Live Score", icon: "📊" },
            { title: "Real-time Updates", icon: "⚡" }
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-xl text-center hover:scale-105 transition"
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-semibold">{f.title}</h3>
            </div>
          ))}

        </div>
      </section>

      {/* 🏏 CALL TO ACTION */}
      <section className="py-16 text-center bg-black text-white">

        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Playing?
        </h2>

        <p className="mb-6 text-gray-400">
          Join tournaments and showcase your skills now!
        </p>

        <button
          onClick={() => navigate("/register")}
          className="bg-green-500 px-6 py-3 rounded-lg hover:bg-green-600"
        >
          Get Started 🚀
        </button>

      </section>

      {/* 🔻 FOOTER */}
      <footer className="bg-[#0f2027] py-6 text-center text-gray-400">
        © 2026 CricHub | Built by Arif Abbas 💻🔥
      </footer>

    </div>
  );
};

export default LandingPage;