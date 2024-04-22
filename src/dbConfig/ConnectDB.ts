import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    console.log("MongoDB connected");
  } catch (error: any) {
    console.error("MongoDB connection error:", error.message);
  }
};
