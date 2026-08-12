const Usage = require("../models/Usage");

// ======================================================
// DAILY ANALYTICS
// GET /api/analytics/daily
// ======================================================

exports.getDailyAnalytics = async (req, res) => {
  try {
    const { deviceType } = req.query;

    // Start of today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // Start of tomorrow
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    // Build query
    const query = {
      userId: req.user.id,
      date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    };

    // Optional device filter
    if (deviceType) {
      query.deviceType = deviceType;
    }

    const usage = await Usage.find(query);

    // ------------------------------------------
    // Calculate totals
    // ------------------------------------------

    let totalScreenTime = 0;
    let productiveTime = 0;
    let neutralTime = 0;
    let unproductiveTime = 0;

    const appMap = {};

    usage.forEach((record) => {
      totalScreenTime += record.totalTime;

      if (record.category === "productive") {
        productiveTime += record.totalTime;
      } else if (record.category === "unproductive") {
        unproductiveTime += record.totalTime;
      } else {
        neutralTime += record.totalTime;
      }

      if (!appMap[record.appName]) {
        appMap[record.appName] = 0;
      }

      appMap[record.appName] += record.totalTime;
    });

    // ------------------------------------------
    // App usage
    // ------------------------------------------

    const appUsage = Object.entries(appMap)
      .map(([appName, totalTime]) => ({
        appName,
        totalTime,
      }))
      .sort((a, b) => b.totalTime - a.totalTime);

    const mostUsedApp =
      appUsage.length > 0 ? appUsage[0] : null;

    // ------------------------------------------
    // Response
    // ------------------------------------------

    return res.status(200).json({
      success: true,

      date: startOfDay,

      analytics: {
        totalScreenTime,
        productiveTime,
        neutralTime,
        unproductiveTime,
        mostUsedApp,
        appUsage,
      },
    });

  } catch (error) {
    console.error("Daily analytics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate daily analytics",
    });
  }
};


// ======================================================
// WEEKLY ANALYTICS
// GET /api/analytics/weekly
// ======================================================

exports.getWeeklyAnalytics = async (req, res) => {
  try {
    const { deviceType } = req.query;

    // ------------------------------------------
    // Get last 7 days
    // ------------------------------------------

    const endDate = new Date();

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);

    const query = {
      userId: req.user.id,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    };

    // Optional device filter
    if (deviceType) {
      query.deviceType = deviceType;
    }

    const usage = await Usage.find(query);

    // ------------------------------------------
    // Create 7-day structure
    // ------------------------------------------

    const days = {};

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const key = date.toISOString().split("T")[0];

      days[key] = {
        date: key,
        totalScreenTime: 0,
        productiveTime: 0,
        neutralTime: 0,
        unproductiveTime: 0,
      };
    }

    // ------------------------------------------
    // Add usage to each day
    // ------------------------------------------

    usage.forEach((record) => {
      const key = new Date(record.date)
        .toISOString()
        .split("T")[0];

      if (!days[key]) return;

      days[key].totalScreenTime += record.totalTime;

      if (record.category === "productive") {
        days[key].productiveTime += record.totalTime;
      } else if (record.category === "unproductive") {
        days[key].unproductiveTime += record.totalTime;
      } else {
        days[key].neutralTime += record.totalTime;
      }
    });

    const weeklyData = Object.values(days);

    // ------------------------------------------
    // Weekly total
    // ------------------------------------------

    const weeklyTotal = weeklyData.reduce(
      (sum, day) => sum + day.totalScreenTime,
      0
    );

    return res.status(200).json({
      success: true,

      period: {
        start: startDate,
        end: endDate,
      },

      weeklyTotal,

      days: weeklyData,
    });

  } catch (error) {
    console.error("Weekly analytics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate weekly analytics",
    });
  }
};