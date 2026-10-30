import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";
import { initSocket } from "./socket.js";
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
initSocket(server);
const startServer = async () => {
  try {
    // Try to connect to MongoDB, but don't fail if it's not available
    const dbConnected = await connectDB();
    
    server.listen(PORT, () => {
      console.log("--------------------------------");
      console.log(`🚀 Server Running`);
      console.log(`🌍 http://localhost:${PORT}`);
      if (!dbConnected) {
        console.log("⚠️  Database not connected - API features may be limited");
      }
      console.log("--------------------------------");
    });
  } catch (error) {
    console.error("Server failed:", error.message);
    process.exit(1);
  }
};
startServer();
