import { NextRequest } from "next/server";
import { addClient, removeClient } from "@/lib/sse";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") as string;
  const role = searchParams.get("role") as string;

  const stream = new ReadableStream({
    start(controller) {
      const id = addClient(controller, { userId, role });

      controller.enqueue(
        new TextEncoder().encode(`data: Connected to notifications\n\n`)
      );

      req.signal.addEventListener("abort", () => {
        removeClient(id);
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
