// server.ts
import next from "next";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

async function main() {
  await app.prepare();

  // Create an HTTP server
  const httpServer = createServer((req, res) => {
    handle(req, res);
  });

  // Initialize Socket.IO on the same server & port
  const io = new SocketIOServer(httpServer, {
    cors: { origin: "*" },
    path: "/api/socket",
  });

  // Socket events
  io.on("connection", (socket) => {
    console.log("✅ Client connected:", socket.id);

    socket.on("sendNotification", (data) => {
      console.log("📢 Received:", data);
      io.emit("newNotification", data); // broadcast to all
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  // Start Next.js + Socket.IO on the same port
  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server + Socket.IO running on http://localhost:${PORT}`);
  });
}

main().catch((err) => console.error("Server init failed:", err));
