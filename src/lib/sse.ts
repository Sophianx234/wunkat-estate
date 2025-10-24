type SSEClient = {
  id: number;
  controller: ReadableStreamDefaultController;
  userId?: string;
  role?: string;
};

const globalForSSE = globalThis as unknown as {
  clients: SSEClient[];
  clientId: number;
};

if (!globalForSSE.clients) {
  globalForSSE.clients = [];
  globalForSSE.clientId = 0;
}

export function addClient(
  controller: ReadableStreamDefaultController,
  meta?: { userId?: string; role?: string }
) {
  // 🧩 Prevent unauthenticated clients from connecting
  if (!meta?.userId) {
    console.warn("🚫 Unauthorized SSE connection attempt — no userId provided");
    controller.close();
    return -1; // signal rejected
  }
  
  const id = ++globalForSSE.clientId;
  globalForSSE.clients.push({ id, controller, ...meta });
  console.log(`🔗 Client connected (${globalForSSE.clients.length} total)`);

  return id;
}


export function removeClient(id: number) {
  globalForSSE.clients = globalForSSE.clients.filter((c) => c.id !== id);
  console.log(`❌ Client disconnected (${globalForSSE.clients.length} total)`);
}

export function broadcast(
  data: string,
  target?: { audience?: "all" | "user" | "admin"; userId?: string }
) {
  const message = `data: ${data}\n\n`;
  const encoder = new TextEncoder();

  // Default audience is 'all'
  const audience = target?.audience ?? "all";

  // 🧩 Filter clients from the global store
  const clients = globalForSSE.clients || [];

  // Determine which clients to send to
  const targets = clients.filter((client) => {
    if (audience === "all") return true;
    if (audience === "admin") return client.role === "admin";
    if (audience === "user") {
      if (target?.userId) return client.userId === target.userId; // specific user
      return client.role === "user"; // all users
    }
    return false;
  });

  // 🧾 Log who we are broadcasting to
  console.log("📢 Broadcasting message to clients in globalThis:");
  console.table(
    targets.map((c) => ({
      id: c.id,
      userId: c.userId ?? "unknown",
      role: c.role ?? "unknown",
    }))
  );

  // 📨 Send to all selected clients
  for (const client of targets) {
    try {
      client.controller.enqueue(encoder.encode(message));
    } catch (err) {
      console.error(`❌ Failed to send to client ${client.userId ?? client.id}:`, err);
    }
  }

  console.log(`✅ Broadcast complete — sent to ${targets.length} client(s).`);
}

