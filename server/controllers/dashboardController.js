const Usage = require("../models/Usage");


// ======================================================
// GET DASHBOARD ANALYTICS
// GET /api/dashboard/analytics
// ======================================================

exports.getDashboardAnalytics = async (req, res) => {
  try {

    // Get usage data of logged-in user
    const usageData = await Usage.find({
      userId: req.user.id,
    }).sort({
      date: -1,
    });


    // No usage data
    if (usageData.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No usage data available yet",

        analytics: {
          totalScreenTime: 0,
          productiveTime: 0,
          unproductiveTime: 0,
          neutralTime: 0,
          mostUsedApp: null,
          appUsage: [],
        },
      });
    }


    // --------------------------------------------------
    // Calculate total times
    // --------------------------------------------------

    let totalScreenTime = 0;
    let productiveTime = 0;
    let unproductiveTime = 0;
    let neutralTime = 0;


    // Store app-wise usage
    const appUsageMap = {};


    // --------------------------------------------------
    // Process usage records
    // --------------------------------------------------

    usageData.forEach((record) => {

      // Total screen time
      totalScreenTime += record.totalTime;


      // Category-wise time
      if (record.category === "productive") {
        productiveTime += record.totalTime;
      }

      else if (record.category === "unproductive") {
        unproductiveTime += record.totalTime;
      }

      else {
        neutralTime += record.totalTime;
      }


      // App-wise time
      if (!appUsageMap[record.appName]) {
        appUsageMap[record.appName] = 0;
      }

      appUsageMap[record.appName] += record.totalTime;
    });


    // --------------------------------------------------
    // Convert app usage into array
    // --------------------------------------------------

    const appUsage = Object.entries(appUsageMap)
      .map(([appName, totalTime]) => ({
        appName,
        totalTime,
      }))
      .sort((a, b) => b.totalTime - a.totalTime);


    // --------------------------------------------------
    // Find most used app
    // --------------------------------------------------

    const mostUsedApp =
      appUsage.length > 0
        ? appUsage[0]
        : null;


    // --------------------------------------------------
    // Send dashboard analytics
    // --------------------------------------------------

    return res.status(200).json({
      success: true,

      analytics: {
        totalScreenTime,
        productiveTime,
        unproductiveTime,
        neutralTime,
        mostUsedApp,
        appUsage,
      },
    });

  } catch (error) {

    console.error(
      "Dashboard analytics error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to generate dashboard analytics",
    });
  }
};



// ======================================================
// GET ACTIVITY ANALYTICS
// GET /api/dashboard/activity-analytics
// ======================================================

exports.getActivityAnalytics = async (req, res) => {
  try {

    // --------------------------------------------------
    // Get usage data of logged-in user
    // --------------------------------------------------

    const usageData = await Usage.find({
      userId: req.user.id,
    }).sort({
      date: -1,
    });


    // --------------------------------------------------
    // No usage data
    // --------------------------------------------------

    if (usageData.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No activity data available yet",
        activities: [],
      });
    }


    // --------------------------------------------------
    // Store activity totals
    // --------------------------------------------------

    const activityMap = {};


    // --------------------------------------------------
    // Process every usage record
    // --------------------------------------------------

    usageData.forEach((record) => {

      // Convert Mongoose Map into normal JavaScript object
      const activities = record.activities
        ? Object.fromEntries(record.activities)
        : {};


      // Process every activity
      Object.entries(activities).forEach(
        ([activityName, time]) => {

          if (!activityMap[activityName]) {
            activityMap[activityName] = 0;
          }

          activityMap[activityName] += time;
        }
      );

    });


    // --------------------------------------------------
    // Convert activity object into array
    // --------------------------------------------------

    const activities = Object.entries(activityMap)
      .map(([activityName, totalTime]) => ({
        activityName,
        totalTime,
      }))
      .sort(
        (a, b) => b.totalTime - a.totalTime
      );


    // --------------------------------------------------
    // Send activity analytics
    // --------------------------------------------------

    return res.status(200).json({
      success: true,
      activities,
    });

  } catch (error) {

    console.error(
      "Activity analytics error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to generate activity analytics",
    });
  }
};