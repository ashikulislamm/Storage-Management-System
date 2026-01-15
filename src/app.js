import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Import routes
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import fileRoutes from "./modules/files/file.routes.js";
import folderRoutes from "./modules/folders/folder.routes.js";
import shareRoutes from "./modules/share/share.routes.js";
import favoriteRoutes from "./modules/favorites/favorite.routes.js";
import activityRoutes from "./modules/activity/activity.routes.js";

// cors and body parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// home route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Storage Management System API - Server is running",
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/shares", shareRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/activities", activityRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Error handler middleware
app.use(errorHandler);

export default app;
