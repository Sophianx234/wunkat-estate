type SSEClient = {
  id: number;
  controller: ReadableStreamDefaultController;
  userId?: string;
  role?: string;
  connectedAt: Date;
};

const globalForSSE = globalThis as unknown as {
  clients: SSEClient[];
  clientId: number;
};

if (!globalForSSE.clients) {
  globalForSSE.clients = [];
  globalForSSE.clientId = 0;
}

/**
 * Add a new SSE client connection
 */
export function addClient(
  controller: ReadableStreamDefaultController,
  meta?: { userId?: string; role?: string }
) {
  if (!meta?.userId) {
    console.warn("🚫 Unauthorized SSE connection attempt — missing userId");
    controller.close();
    return -1;
  }

  const id = ++globalForSSE.clientId;

  globalForSSE.clients.push({
    id,
    controller,
    userId: meta.userId,
    role: meta.role,
    connectedAt: new Date(),
  });

  console.log(`🔗 Client connected — userId: ${meta.userId}, role: ${meta.role}`);
  console.log(`📡 Total active clients: ${globalForSSE.clients.length}`);

  return id;
}

/**
 * Remove a disconnected client
 */
export function removeClient(id: number) {
  globalForSSE.clients = globalForSSE.clients.filter((c) => c.id !== id);
  console.log(`❌ Client ${id} disconnected (${globalForSSE.clients.length} remaining)`);
}

/**
 * Broadcast data to specific audiences or users
 */
export function broadcast(
  data: string,
  target?: { audience?: "all" | "user" | "admin"; userId?: string }
) {
  const message = `data: ${data}\n\n`;
  const encoder = new TextEncoder();

  const audience = target?.audience ?? "all";
  const clients = globalForSSE.clients || [];

  // Determine target clients
  const targets = clients.filter((client) => {
    if (audience === "all") return true;
    if (audience === "admin") return client.role === "admin";
    if (audience === "user") {
      if (target?.userId) return client.userId === target.userId; // single user
      return client.role === "user"; // all users
    }
    return false;
  });

  if (targets.length === 0) {
    console.warn(`⚠️ No active clients matched for audience '${audience}'`);
    return;
  }

  // Log broadcast summary
  console.log(`📢 Broadcasting message → audience: ${audience}, recipients: ${targets.length}`);
  console.table(
    targets.map((c) => ({
      id: c.id,
      userId: c.userId ?? "unknown",
      role: c.role ?? "unknown",
      connectedAt: c.connectedAt.toISOString(),
    }))
  );

  // Send message
  for (const client of targets) {
    try {
      client.controller.enqueue(encoder.encode(message));
    } catch (err) {
      console.error(`❌ Failed to send to client ${client.userId ?? client.id}:`, err);
    }
  }

  console.log(`✅ Broadcast complete — delivered to ${targets.length} client(s).`);
}

/**
 * Optional cleanup function — useful if you notice stale clients
 */
export function cleanupDisconnectedClients() {
  const before = globalForSSE.clients.length;
  globalForSSE.clients = globalForSSE.clients.filter((c) => {
    try {
      c.controller.enqueue(new TextEncoder().encode(": ping\n\n"));
      return true;
    } catch {
      return false;
    }
  });
  const after = globalForSSE.clients.length;
  if (after < before)
    console.log(`🧹 Cleaned up ${before - after} disconnected SSE clients`);
}
