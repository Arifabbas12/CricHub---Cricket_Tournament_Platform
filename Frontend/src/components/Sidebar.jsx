import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const location = useLocation();

  const menu = [
    { name: "Home", path: "/home" },
    { name: "Create", path: "/create" },
    { name: "My Tournaments", path: "/my-tournaments" },
    { name: "My Teams", path: "/my-teams" },
    { name: "Matches", path: "/matches" },
    { name: "Admin", path: "/admin" }

  ];

  return (
    <div
  className={`fixed top-0 left-0 h-full w-64 bg-white/10 backdrop-blur-lg text-white p-4 transform transition-transform duration-300 z-50
  ${isOpen ? "translate-x-0" : "-translate-x-full"}
`}
>
<button
  onClick={closeSidebar}
  className="mb-4 text-right w-full text-xl"
>
  ❌
</button>
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>

      {menu.map(item => (
        <Link
          key={item.path}
          to={item.path}
          className={`block px-3 py-2 rounded mb-2 ${
            location.pathname === item.path
              ? "bg-white text-black"
              : "hover:bg-white/20"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;