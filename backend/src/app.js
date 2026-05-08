import express from "express";
import cors from "cors";

import taskRoutes from "./routes/task.routes.js";
import userRoutes from "./routes/user.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

/**
 * Middlewares
 */
app.use(cors());

app.use(express.json());

/**
 * Routes
 */
app.use("/api/tasks", taskRoutes);

app.use("/api/auth", userRoutes);

/**
 * Health Route
 */
app.get("/", (req, res) => {
  res.json({
    message: "API Running",
  });
});

/**
 * Error Middleware
 */
app.use(errorMiddleware);

export default app;
