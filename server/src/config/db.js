import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Set connection timeout to 5 seconds for faster failure
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      console.warn("⚠️  MONGO_URL not configured. Database features may not work.");
      return false;
    }

    await mongoose.connect(mongoUrl, {
      connectTimeoutMS: 5000,
      socketTimeoutMS: 5000,
    });
    console.log("✅ MongoDB connected");
    return true;
  } catch (error) {
    console.warn("⚠️  MongoDB connection failed:", error.message);
    console.warn("    The server will start but database features will not work.");
    console.warn("    Make sure MongoDB is running at:", process.env.MONGO_URL);
    return false;
  }
};
export default connectDB;
