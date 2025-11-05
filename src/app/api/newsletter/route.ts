import { connectToDatabase } from "@/config/DbConnect";
import Subscriber from "@/models/Subscriber";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
connectToDatabase()
    const {  email } = await req.json();

    // Check if already subscribed
    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      if (subscriber.status === "active") {
        return NextResponse.json({ message: "Already subscribed" });
      } else {
        subscriber.status = "active";
        await subscriber.save();
        return NextResponse.json({ message: "Subscription reactivated" });
      }
    }

    subscriber = await Subscriber.create({ email });
    return NextResponse.json({ message: "Subscribed successfully", subscriber });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
