import Task from "../models/task.model.js";

/**
 * Get dashboard stats
 */
export const getDashboardData = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Base filter (exclude deleted tasks)
    const baseFilter = {
      user: userId,
      isDeleted: false,
    };

    // Run all counts in parallel
    const [totalTasks, completedTasks, pendingTasks] = await Promise.all([
      Task.countDocuments(baseFilter),

      Task.countDocuments({
        ...baseFilter,
        status: "Completed",
      }),

      Task.countDocuments({
        ...baseFilter,
        status: "Pending",
      }),
    ]);

    res.status(200).json({
      totalTasks,
      completedTasks,
      pendingTasks,
    });
  } catch (error) {
    next(error);
  }
};
