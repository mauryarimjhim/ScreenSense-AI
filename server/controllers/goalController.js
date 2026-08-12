const Goal = require("../models/Goal");
const Usage = require("../models/Usage");

// ======================================================
// CREATE GOAL
// POST /api/goals
// ======================================================

exports.createGoal = async (req, res) => {
  try {
    const {
      goalType,
      appName,
      targetMinutes,
      period,
    } = req.body;

    // ------------------------------------------
    // Validation
    // ------------------------------------------

    if (!goalType || targetMinutes === undefined) {
      return res.status(400).json({
        success: false,
        message: "Goal type and target minutes are required",
      });
    }

    if (
      !["screen_time", "productive_time", "app_limit"].includes(
        goalType
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid goal type",
      });
    }

    if (goalType === "app_limit" && !appName) {
      return res.status(400).json({
        success: false,
        message: "App name is required for app limit goals",
      });
    }

    if (targetMinutes <= 0) {
      return res.status(400).json({
        success: false,
        message: "Target minutes must be greater than 0",
      });
    }

    // ------------------------------------------
    // Create goal
    // ------------------------------------------

    const goal = await Goal.create({
      userId: req.user.id,
      goalType,
      appName: appName ? appName.trim() : null,
      targetMinutes,
      period: period || "daily",
    });

    return res.status(201).json({
      success: true,
      message: "Goal created successfully",
      goal,
    });

  } catch (error) {
    console.error("Create goal error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create goal",
    });
  }
};


// ======================================================
// GET ALL GOALS
// GET /api/goals
// ======================================================

exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: goals.length,
      goals,
    });

  } catch (error) {
    console.error("Get goals error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch goals",
    });
  }
};


// ======================================================
// UPDATE GOAL
// PUT /api/goals/:id
// ======================================================

exports.updateGoal = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      targetMinutes,
      period,
      appName,
    } = req.body;

    const goal = await Goal.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    if (targetMinutes !== undefined) {
      if (targetMinutes <= 0) {
        return res.status(400).json({
          success: false,
          message: "Target minutes must be greater than 0",
        });
      }

      goal.targetMinutes = targetMinutes;
    }

    if (period !== undefined) {
      goal.period = period;
    }

    if (appName !== undefined) {
      goal.appName = appName.trim();
    }

    await goal.save();

    return res.status(200).json({
      success: true,
      message: "Goal updated successfully",
      goal,
    });

  } catch (error) {
    console.error("Update goal error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update goal",
    });
  }
};


// ======================================================
// DELETE GOAL
// DELETE /api/goals/:id
// ======================================================

exports.deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;

    const goal = await Goal.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Goal deleted successfully",
    });

  } catch (error) {
    console.error("Delete goal error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete goal",
    });
  }
};


// ======================================================
// GET GOAL PROGRESS
// GET /api/goals/progress
// ======================================================

exports.getGoalProgress = async (req, res) => {
  try {
    const goals = await Goal.find({
      userId: req.user.id,
    });

    if (goals.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No goals found",
        progress: [],
      });
    }

    // ------------------------------------------
    // Today's date range
    // ------------------------------------------

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    // ------------------------------------------
    // Get today's usage
    // ------------------------------------------

    const usage = await Usage.find({
      userId: req.user.id,
      date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    // ------------------------------------------
    // Calculate totals
    // ------------------------------------------

    let totalScreenTime = 0;
    let productiveTime = 0;

    const appUsage = {};

    usage.forEach((record) => {
      totalScreenTime += record.totalTime;

      if (record.category === "productive") {
        productiveTime += record.totalTime;
      }

      if (!appUsage[record.appName]) {
        appUsage[record.appName] = 0;
      }

      appUsage[record.appName] += record.totalTime;
    });

    // ------------------------------------------
    // Calculate progress
    // ------------------------------------------

    const progress = goals.map((goal) => {

      let currentMinutes = 0;

      if (goal.goalType === "screen_time") {
        currentMinutes = totalScreenTime;
      }

      else if (goal.goalType === "productive_time") {
        currentMinutes = productiveTime;
      }

      else if (goal.goalType === "app_limit") {
        currentMinutes = appUsage[goal.appName] || 0;
      }

      const percentage =
        goal.targetMinutes > 0
          ? Math.round(
              (currentMinutes / goal.targetMinutes) * 100
            )
          : 0;

      return {
        goalId: goal._id,
        goalType: goal.goalType,
        appName: goal.appName,
        targetMinutes: goal.targetMinutes,
        currentMinutes,
        percentage,
        completed: currentMinutes >= goal.targetMinutes,
      };
    });

    return res.status(200).json({
      success: true,
      progress,
    });

  } catch (error) {
    console.error("Goal progress error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to calculate goal progress",
    });
  }
};