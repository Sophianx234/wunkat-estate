// scripts/seed.ts
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

import User from "@/models/User";
import House from "@/models/House";
import Room from "@/models/Room";
import Payment from "@/models/Payment";
import Notification from "@/models/Notification";
import { connectToDatabase } from "@/config/DbConnect";
import dotenv from "dotenv";
dotenv.config();


async function seed() {
  try {
    await connectToDatabase();

    // Clear old data
    await Promise.all([
      User.deleteMany({}),
      House.deleteMany({}),
      Room.deleteMany({}),
      Payment.deleteMany({}),
      Notification.deleteMany({}),
    ]);
    console.log("🧹 Cleared existing collections");

    // Helper to load JSON
    const loadJSON = (file: string) =>
      JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data", file), "utf-8"));

    // Load data
    const users = loadJSON("users.json");
    const houses = loadJSON("houses.json");
    const rooms = loadJSON("rooms.json");
    const payments = loadJSON("payments.json");
    const notifications = loadJSON("notifications.json");

    // Insert data
    await User.insertMany(users);
    await House.insertMany(houses);
    await Room.insertMany(rooms);
    await Payment.insertMany(payments);
    await Notification.insertMany(notifications);

    console.log("✅ Database successfully seeded with sample data!");
    await mongoose.connection.close();
    console.log("🔌 Connection closed.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seed();
