const express = require("express");

const router = express.Router();

const {
  getDailyAnalytics,
  getWeeklyAnalytics,
  getFeatureAnalytics,
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

// Aggregated, real usage data for the feature pages (apps, behaviour,
// forecasts and reports). Keeping this server-side ensures every screen uses
// the same authenticated source of truth.
router.get("/features", protect, getFeatureAnalytics);


module.exports = router;
