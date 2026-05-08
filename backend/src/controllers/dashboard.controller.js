import Task from "../models/task.model.js";

// Get dashboard data
export const getDashboardData = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const baseFilter = {
      user: userId,
      isDeleted: false,
    };

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
