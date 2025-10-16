type SSEClient = {
  id: number;
  controller: ReadableStreamDefaultController;
};

let clients: SSEClient[] = [];
let clientId = 0;

export function addClient(controller: ReadableStreamDefaultController) {
  const id = ++clientId;
  clients.push({ id, controller });
  console.log(`🔗 Client connected (${clients.length} total)`);
  return id;
}

export function removeClient(id: number) {
  clients = clients.filter((client) => client.id !== id);
  console.log(`❌ Client disconnected (${clients.length} total)`);
}

export function broadcast(data: string) {
  const message = `data: ${data}\n\n`;
  const encoder = new TextEncoder();
  for (const client of clients) {
    try {
      client.controller.enqueue(encoder.encode(message));
    } catch (e) {
      console.error("Error sending message:", e);
    }
  }
}
