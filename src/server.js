import "dotenv/config";
import app from "./app.js";
import config from "./config/index.js";
import { connectDB } from "./config/db.config.js";
import logger from "./utils/logger.js";

// Connect to database
connectDB();

const port = config.port;

const server = app.listen(port, () => {
  logger.info(`Server running in ${config.env} mode on port ${port}`);
  console.log(`🚀 Server is running on http://localhost:${port}`);
  console.log(`📚 API Base URL: http://localhost:${port}/api`);
  console.log(`📚 Health Check URL: http://localhost:${port}/health`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  console.log("❌ Unhandled Rejection! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM
process.on("SIGTERM", () => {
  logger.info("SIGTERM received. Shutting down gracefully...");
  console.log("👋 SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("💤 Process terminated!");
  });
});
