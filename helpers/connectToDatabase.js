import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Database connection successful');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

