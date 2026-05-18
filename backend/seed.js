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
      "The tap in the kitchen is dripping constantly. Needs a washer replacement or a new mixer tap installed.",
    category: "Plumbing",
    location: "Colombo 3",
    postedBy: userId,
    status: "Open",
  },
  {
    title: "Living Room Painting",
    description:
      "Looking for a professional to paint a 12x15 living room. Paint will be provided by the owner.",
    category: "Painting",
    location: "Nugegoda",
    postedBy: userId,
    status: "Open",
  },
  {
    title: "Garden Fence Repair",
    description:
      "Two panels of the wooden fence were blown down during heavy rain. Need them re-secured and repainted.",
    category: "Carpentry",
    location: "Dehiwala",
    postedBy: userId,
    status: "In Progress",
  },
  {
    title: "New Double Socket Installation",
    description:
      "Need an extra double power socket installed in the home office. Existing wiring is accessible.",
    category: "Electrical",
    location: "Colombo 5",
    postedBy: userId,
    status: "Open",
  },
  {
    title: "Broken Bedroom Door Handle",
    description:
      "The internal handle for the master bedroom has snapped off. Needs a like-for-like replacement.",
    category: "Carpentry",
    location: "Mount Lavinia",
    postedBy: userId,
    status: "Closed",
  },
  {
    title: "Bathroom Ceiling Deep Clean",
    description:
      "Bathroom ceiling has mould build-up from poor ventilation. Needs scrubbing, treating, and sealing.",
    category: "Cleaning",
    location: "Maharagama",
    postedBy: userId,
    status: "Open",
  },
  {
    title: "Ceiling Fan Installation",
    description:
      "Have a brand new ceiling fan that needs installing in the master bedroom. Existing light fitting in place.",
    category: "Electrical",
    location: "Colombo 6",
    postedBy: userId,
    status: "Open",
  },
  {
    title: "Kitchen Cabinet Hinge Repair",
    description:
      "Three cabinet doors are hanging loose due to broken hinges. Need replacing with soft-close fittings.",
    category: "Carpentry",
    location: "Borella",
    postedBy: userId,
    status: "Open",
  },
  {
    title: "House Move — 3-Bedroom",
    description:
      "Moving from a 3-bedroom house in Nugegoda to Piliyandala. Need a van and at least two helpers for the day.",
    category: "Moving",
    location: "Nugegoda",
    postedBy: userId,
    status: "Open",
  },
  {
    title: "Outdoor Tap Installation",
    description:
      "Need an outdoor tap fitted to the back of the house for garden use. Water supply is nearby.",
    category: "Plumbing",
    location: "Piliyandala",
    postedBy: userId,
    status: "In Progress",
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

  //comment out this below section if you want to keep existing data in the database. It will delete all existing job requests before seeding new ones.

    await JobRequest.deleteMany();
    console.log("Existing jobs cleared");

  //End of deletion of existing data section *******************************************************************************

    await JobRequest.insertMany(sampleJobs);
    console.log(`${sampleJobs.length} sample jobs seeded successfully`);

    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedDatabase();
