const express = require("express");

const router = express.Router();

const {
  getDashboardAnalytics,
  getActivityAnalytics,
} = require("../controllers/dashboardController");

const {
  protect,
} = require("../middlewares/authMiddleware");


// Dashboard analytics
router.get(
  "/analytics",
  protect,
  getDashboardAnalytics
);


// Activity analytics
router.get(
  "/activity-analytics",
  protect,
  getActivityAnalytics
);

module.exports = router;