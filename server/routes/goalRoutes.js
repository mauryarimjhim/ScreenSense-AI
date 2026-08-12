const express = require("express");

const router = express.Router();

const {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
  getGoalProgress,
} = require("../controllers/goalController");

const {
  protect,
} = require("../middlewares/authMiddleware");


// Create goal
router.post(
  "/",
  protect,
  createGoal
);


// Get all goals
router.get(
  "/",
  protect,
  getGoals
);


// Get goal progress
router.get(
  "/progress",
  protect,
  getGoalProgress
);


// Update goal
router.put(
  "/:id",
  protect,
  updateGoal
);


// Delete goal
router.delete(
  "/:id",
  protect,
  deleteGoal
);


module.exports = router;