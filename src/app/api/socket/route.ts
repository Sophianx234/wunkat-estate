import { NextRequest } from "next/server";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { Socket } from "net";

type SocketServer = NetServer & { io?: ServerIO };
type SocketWithIO = Socket & { server: SocketServer };

const ioHandler = async (req: NextRequest) => {
  // @ts-ignore
  const res = new Response("Socket server running", { status: 200 });

  // Prevent multiple servers
  const server = (req as any).socket?.server as SocketWithIO["server"];
  if (!server.io) {
    const io = new ServerIO(server, {
      path: "/api/socket/io",
      addTrailingSlash: false,
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      console.log("✅ New client connected:", socket.id);

      socket.on("message", (msg) => {
        console.log("📩 Message received:", msg);
        io.emit("message", msg); // broadcast to all
      });

      socket.on("disconnect", () => {
        console.log("❌ Client disconnected:", socket.id);
      });
    });

    server.io = io;
  }

  return res;
};

export { ioHandler as GET, ioHandler as POST };
