import express from "express";
import cors from "cors";

import taskRoutes from "./routes/task.routes.js";
import userRoutes from "./routes/user.routes.js";
import dashboardRoutes from "./routes/dashboard.route.js";
import errorMiddleware from "./middleware/error.middleware.js";
import { authMiddleware } from "./middleware/auth.middleware.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", authMiddleware, taskRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/dashboard", authMiddleware, dashboardRoutes);

// Health Check
app.get("/", (req, res) => {
  res.json({
    message: "API Running",
  });
});

// Error Middleware
app.use(errorMiddleware);

export default app;
