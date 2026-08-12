const express = require("express");

const router = express.Router();

const {
  getDailyAnalytics,
  getWeeklyAnalytics,
} = require("../controllers/analyticsController");

const {
  protect,
} = require("../middlewares/authMiddleware");


// Daily analytics
router.get(
  "/daily",
  protect,
  getDailyAnalytics
);


// Weekly analytics
router.get(
  "/weekly",
  protect,
  getWeeklyAnalytics
);


module.exports = router;