import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">

      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl text-white w-96 shadow-xl">

        {/* 👤 Avatar */}
        <div className="text-center mb-4">
          <div className="text-5xl mb-2">👤</div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
        </div>

        {/* 📋 Info */}
        <div className="space-y-3 text-sm">
          <p><strong>📞 Phone:</strong> {user.phone}</p>
          <p><strong>🎭 Role:</strong> {user.role}</p>
        </div>

        {/* 🚪 Logout */}
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="mt-6 w-full bg-red-500 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Profile;