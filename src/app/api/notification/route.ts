import { NextRequest } from "next/server";
import { addClient, removeClient } from "@/lib/sse";

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
  const id = addClient(controller);
  controller.enqueue(encoder.encode(`data: Connected to notifications\n\n`));

  const interval = setInterval(() => {
    controller.enqueue(encoder.encode(`: heartbeat\n\n`));
  }, 20000); // every 20s

  req.signal.addEventListener("abort", () => {
    clearInterval(interval);
    removeClient(id);
    controller.close();
  });
}
,
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
    },
  });
}
