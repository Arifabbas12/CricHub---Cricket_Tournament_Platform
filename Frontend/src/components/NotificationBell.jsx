import { useEffect, useState } from "react";
import socket from "../services/socket";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // 🔥 user register to socket
    if (user?._id) {
      socket.emit("registerUser", user._id);
    }

    // 🔔 receive notifications
    socket.on("newNotification", (data) => {
      setNotifications(prev => [data, ...prev]);
      setUnread(prev => prev + 1);
    });

    // cleanup
    return () => {
      socket.off("newNotification");
    };
  }, []);

  // 🔓 open + mark as read
  const handleOpen = () => {
    setOpen(!open);
    setUnread(0);
  };

  return (
    <div className="relative">

      {/* 🔔 Bell */}
      <button
        onClick={handleOpen}
        className="text-xl relative"
      >
        🔔

        {/* 🔴 Unread count */}
        {unread > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            {unread}
          </span>
        )}
      </button>

      {/* 🔽 Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-xl shadow-xl z-50 overflow-hidden">

          <h3 className="px-3 py-2 font-semibold border-b">
            Notifications
          </h3>

          {notifications.length === 0 ? (
            <p className="p-3 text-sm">No notifications 😴</p>
          ) : (
            notifications.map((n, i) => (
              <p
                key={i}
                className="px-3 py-2 text-sm border-b hover:bg-gray-100"
              >
                {n.message}
              </p>
            ))
          )}

        </div>
      )}

    </div>
  );
};

export default NotificationBell;