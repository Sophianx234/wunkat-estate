export const runtime = "nodejs"; // ✅ Must be Node runtime, not Edge

import { Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { NextRequest } from "next/server";

let io: SocketIOServer | null = (globalThis as any).io || null;

export async function GET(req: NextRequest) {
  try {
    if (!io) {
      console.log("🔌 Initializing Socket.IO...");

      // Create a lightweight HTTP server manually
      const httpServer = new HTTPServer();

      io = new SocketIOServer(httpServer, {
        path: "/api/socket",
        cors: { origin: "*" },
      });

      io.on("connection", (socket) => {
        console.log("✅ Client connected:", socket.id);

        socket.on("sendNotification", (data) => {
          console.log("📢 Received:", data);
          io?.emit("newNotification", data);
        });

        socket.on("disconnect", () => {
          console.log("❌ Client disconnected:", socket.id);
        });
      });

      // Start listening on an internal port (e.g. 4001)
      httpServer.listen(3000, () =>
        console.log("🚀 Internal Socket.IO server on port 4001")
      );

      (globalThis as any).io = io;
    } else {
      console.log("⚙️ Socket.IO already running");
    }

    return new Response("Socket.IO active", { status: 200 });
  } catch (err) {
    console.error("💥 Socket.IO error:", err);
    return new Response("Failed to start Socket.IO", { status: 500 });
  }
}
