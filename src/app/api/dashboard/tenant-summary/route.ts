import { NextResponse } from "next/server";
import { connectToDatabase } from "@/config/DbConnect";
import Payment from "@/models/Payment";
import Room from "@/models/Room";
import House from "@/models/House";
import User from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();

    // ✅ Fetch latest completed or pending payments
    const payments = await Payment.find()
      .populate({
        path: "userId",
        select: "name email",
      })
      .populate({
        path: "roomId",
        select: "name houseId price",
        populate: {
          path: "houseId",
          select: "name location.city",
        },
      })
      .sort({ createdAt: -1 })
       // show only 5 in dashboard

    const tenants = payments.map((payment) => {
      const user = payment.userId as any;
      const room = payment.roomId as any;
      const house = room?.houseId as any;

      // ✅ Determine status
      let status: "Active" | "Pending" | "Overdue" = "Pending";
      if (payment.status === "completed") status = "Active";
      else if (new Date(payment.expiresAt) < new Date()) status = "Overdue";

      return {
        name: user?.name || "Unknown",
        email: user?.email || "N/A",
        property: house?.name || "N/A",
        rent: `₵${payment.amount.toLocaleString()}`,
        status,
        dueDate: new Date(payment.expiresAt).toLocaleDateString("en-GB", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
    });

    return NextResponse.json(tenants, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching tenant summary:", error);
    return NextResponse.json(
      { error: "Failed to load tenant summary" },
      { status: 500 }
    );
  }
}
