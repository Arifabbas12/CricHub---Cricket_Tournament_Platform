import { Server } from "socket.io";

let io;
let users = {};

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("registerUser", (userId) => {
      users[userId] = socket.id;
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
};

// 🔥 getter functions
export const getIO = () => io;
export const getUsers = () => users;