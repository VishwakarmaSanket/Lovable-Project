import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Auth server connected to DB");
  } catch (error) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
