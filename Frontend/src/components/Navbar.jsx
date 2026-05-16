import { useState } from "react";
// import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";
import NotificationBell from "./NotificationBell";

const Navbar = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
 const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white/10 backdrop-blur-lg border-b border-white/20 text-white shadow-lg">
    
      {/* 🏏 Logo */}
   <div className="flex items-center gap-3">
    <button
      onClick={toggleSidebar}
      className="text-2xl"
  >
    ☰
  </button>

  <h1 className="text-xl md:text-2xl font-bold text-blue-500">
    🏏 Cric
    <span className="text-green-600">Hub</span>
  </h1>
</div>

      {/* 🔥 Right Section */}
      <div className="flex items-center gap-4">
        
            {/* 🔔 Notification */}
         <NotificationBell />
         
         
        {/* 🌙 Theme Toggle */}
        {/* <ThemeToggle /> */}

        {/* 👤 User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg hover:bg-white/20 transition"
          >
            <span className="text-lg">👤</span>
            <span className="hidden sm:block text-grey-900">
              {user?.name || "User"}
            </span>
          </button>

          {/* 🔽 Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-xl shadow-xl overflow-hidden z-50">

              <button
            onClick={() => navigate("/profile")}
              className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
         >
               👤 Profile
         </button>

         <button 
              onClick={() => navigate("/create")}
              className="block w-full px-4 py-2 hover:bg-red-100 text-left">
                🏏 Create-Tourna...
              </button>

              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/login";
                }}
                className="block w-full px-4 py-2 hover:bg-red-100 text-left"
              >
                🚪 Logout
              </button>


            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default Navbar;