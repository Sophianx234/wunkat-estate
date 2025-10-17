type SSEClient = {
  id: number;
  controller: ReadableStreamDefaultController;
};

// Ensure globalThis has a shared store (singleton)
const globalForSSE = globalThis as unknown as {
  clients: SSEClient[];
  clientId: number;
};

if (!globalForSSE.clients) {
  globalForSSE.clients = [];
  globalForSSE.clientId = 0;
}

export function addClient(controller: ReadableStreamDefaultController) {
  const id = ++globalForSSE.clientId;
  globalForSSE.clients.push({ id, controller });
  console.log(`🔗 Client connected (${globalForSSE.clients.length} total)`);
  return id;
}

export function removeClient(id: number) {
  globalForSSE.clients = globalForSSE.clients.filter((client) => client.id !== id);
  console.log(`❌ Client disconnected (${globalForSSE.clients.length} total)`);
}

export function broadcast(data: string) {
  const message = `data: ${data}\n\n`;
  const encoder = new TextEncoder();
  console.log(`📢 Broadcasting to ${globalForSSE.clients.length} clients`);
  for (const client of globalForSSE.clients) {
    try {
      client.controller.enqueue(encoder.encode(message));
    } catch (e) {
      console.error("Error sending message:", e);
    }
  }
}
