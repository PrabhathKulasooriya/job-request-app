import dotenv from "dotenv";
import mongoose from "mongoose";
import JobRequest from "./models/jopRequestModel.js";
import connectDB from "./config/db.js";

dotenv.config();

const userId = new mongoose.Types.ObjectId("6a05fe1183906a2278b08abd");

const sampleJobs = [
  {
    title: "Leaking Kitchen Tap",
    description:
      "The tap in the kitchen is dripping constantly. Needs a washer replacement or a new mixer installed.",
    category: "Plumbing",
    location: "Glasgow",
    postedBy: userId,
    status: "Open",
  },
  {
    title: "Living Room Painting",
    description:
      "Looking for a professional to paint a 12x15 living room. Paint will be provided.",
    category: "Painting",
    location: "Edinburgh",
    postedBy: userId,
    status: "Open",
  },
  {
    title: "Garden Fence Repair",
    description:
      "Two panels of the wooden fence were blown down during the storm. Need them re-secured.",
    category: "Joinery",
    location: "Glasgow",
    postedBy: userId,
    status: "In Progress",
  },
  {
    title: "New Double Socket Installation",
    description:
      "Need an extra double power socket installed in the home office.",
    category: "Electrical",
    location: "Paisley",
    postedBy: userId,
    status: "Open",
  },
  {
    title: "Broken Bedroom Door Handle",
    description:
      "The internal handle for the master bedroom has snapped off. Needs replacement.",
    category: "Joinery",
    location: "Glasgow",
    postedBy: userId,
    status: "Closed",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await JobRequest.deleteMany();
    console.log("Existing jobs cleared");

    await JobRequest.insertMany(sampleJobs);
    console.log("Sample jobs seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedDatabase();
