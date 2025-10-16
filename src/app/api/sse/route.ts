import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  // Create a readable stream to send continuous events
  const stream = new ReadableStream({
    start(controller) {
      // Send an initial message when the connection opens
      controller.enqueue(encoder.encode(`data: Connected to SSE stream\n\n`));

      // Send a message every 3 seconds
      const interval = setInterval(() => {
        const now = new Date().toISOString();
        const message = `data: ${now}\n\n`;
        controller.enqueue(encoder.encode(message));
      }, 3000);

      // Clean up when the client disconnects
      req.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
        console.log("SSE connection closed");
      });
    },
  });

  // Important: set correct headers
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
    },
  });
}
