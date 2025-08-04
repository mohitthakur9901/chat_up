import { Server } from "socket.io";
import http from "http";
import express from "express";
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
 

const userScoketMap = {};


export const getRevicerScoketId = (userId) => userScoketMap[userId];



io.on("connection", (socket) => {
  
    const userId = socket.handshake.query.userId;
    console.log("a user connected", userId);
    if (userId) userScoketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userScoketMap));

  socket.on("disconnect", () => {
    console.log("a user disconnected");
    delete userScoketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userScoketMap));
  });
});




export { io, app, server };
