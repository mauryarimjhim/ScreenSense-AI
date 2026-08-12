const Usage = require("../models/Usage");
const Goal = require("../models/Goal");

// ======================================================
// GET AI INSIGHTS
// GET /api/insights
// ======================================================

exports.getInsights = async (req, res) => {
  try {

    // --------------------------------------------------
    // Get today's date range
    // --------------------------------------------------

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);


    // --------------------------------------------------
    // Get today's usage
    // --------------------------------------------------

    const usage = await Usage.find({
      userId: req.user.id,
      date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });


    // --------------------------------------------------
    // Get user's goals
    // --------------------------------------------------

    const goals = await Goal.find({
      userId: req.user.id,
    });


    // --------------------------------------------------
    // No usage
    // --------------------------------------------------

    if (usage.length === 0) {
      return res.status(200).json({
        success: true,
        insights: [
          {
            type: "info",
            title: "Start Tracking",
            message:
              "Start using ScreenSense to generate personalized insights about your digital habits.",
          },
        ],
      });
    }


    // --------------------------------------------------
    // Calculate usage
    // --------------------------------------------------

    let totalScreenTime = 0;
    let productiveTime = 0;
    let neutralTime = 0;
    let unproductiveTime = 0;

    const appUsage = {};
    const activityUsage = {};


    usage.forEach((record) => {

      totalScreenTime += record.totalTime;


      if (record.category === "productive") {
        productiveTime += record.totalTime;
      }

      else if (record.category === "unproductive") {
        unproductiveTime += record.totalTime;
      }

      else {
        neutralTime += record.totalTime;
      }


      // App usage
      if (!appUsage[record.appName]) {
        appUsage[record.appName] = 0;
      }

      appUsage[record.appName] += record.totalTime;


      // Activity usage
      const activities = record.activities
        ? Object.fromEntries(record.activities)
        : {};


      Object.entries(activities).forEach(
        ([activityName, time]) => {

          if (!activityUsage[activityName]) {
            activityUsage[activityName] = 0;
          }

          activityUsage[activityName] += time;
        }
      );

    });


    // --------------------------------------------------
    // Find most used app
    // --------------------------------------------------

    const mostUsedApp = Object.entries(appUsage)
      .sort((a, b) => b[1] - a[1])[0];


    // --------------------------------------------------
    // Find most distracting activity
    // --------------------------------------------------

    const mostDistractingActivity =
      Object.entries(activityUsage)
        .sort((a, b) => b[1] - a[1])[0];


    // --------------------------------------------------
    // Productivity score
    // --------------------------------------------------

    let productivityScore = 0;

    if (totalScreenTime > 0) {
      productivityScore = Math.round(
        (
          (productiveTime * 1) +
          (neutralTime * 0.5)
        ) /
        totalScreenTime *
        100
      );
    }


    // --------------------------------------------------
    // Generate insights
    // --------------------------------------------------

    const insights = [];


    // High screen time
    if (totalScreenTime >= 240) {

      insights.push({
        type: "warning",
        title: "High Screen Time",
        message:
          `You have spent ${totalScreenTime} minutes on screens today. Consider taking a short break.`,
      });

    }


    // Good productive time
    if (productiveTime >= 120) {

      insights.push({
        type: "positive",
        title: "Good Productivity",
        message:
          `You have spent ${productiveTime} minutes on productive activities today. Keep it up!`,
      });

    }


    // High distracting time
    if (unproductiveTime >= 90) {

      insights.push({
        type: "warning",
        title: "High Distracting Usage",
        message:
          `You have spent ${unproductiveTime} minutes on distracting activities today.`,
      });

    }


    // Most used app
    if (mostUsedApp) {

      insights.push({
        type: "info",
        title: "Most Used App",
        message:
          `${mostUsedApp[0]} is your most used app today with ${mostUsedApp[1]} minutes.`,
      });

    }


    // Most distracting activity
    if (mostDistractingActivity) {

      insights.push({
        type: "recommendation",
        title: "Reduce Distracting Activity",
        message:
          `${mostDistractingActivity[0]} is your most used activity today with ${mostDistractingActivity[1]} minutes. Consider setting a limit for it.`,
      });

    }


    // Productivity score
    if (productivityScore >= 70) {

      insights.push({
        type: "positive",
        title: "Strong Productivity",
        message:
          `Your productivity score is ${productivityScore}/100. You're maintaining a healthy balance.`,
      });

    }

    else if (productivityScore < 40) {

      insights.push({
        type: "warning",
        title: "Low Productivity",
        message:
          `Your productivity score is ${productivityScore}/100. Try reducing distracting activities.`,
      });

    }


    // --------------------------------------------------
    // Goal-based insights
    // --------------------------------------------------

    goals.forEach((goal) => {

      if (goal.goalType === "screen_time") {

        const percentage =
          (
            totalScreenTime /
            goal.targetMinutes
          ) * 100;


        if (percentage >= 100) {

          insights.push({
            type: "warning",
            title: "Screen Time Goal Exceeded",
            message:
              `You have exceeded your daily screen-time goal of ${goal.targetMinutes} minutes.`,
          });

        }

      }


      if (goal.goalType === "productive_time") {

        if (productiveTime >= goal.targetMinutes) {

          insights.push({
            type: "positive",
            title: "Productive Goal Achieved",
            message:
              `You've achieved your productive-time goal of ${goal.targetMinutes} minutes.`,
          });

        }

      }

    });


    // --------------------------------------------------
    // Default insight
    // --------------------------------------------------

    if (insights.length === 0) {

      insights.push({
        type: "info",
        title: "Keep Going",
        message:
          "Continue using ScreenSense and we'll learn more about your digital habits.",
      });

    }


    // --------------------------------------------------
    // Response
    // --------------------------------------------------

    return res.status(200).json({
      success: true,

      summary: {
        totalScreenTime,
        productiveTime,
        neutralTime,
        unproductiveTime,
        productivityScore,
      },

      insights,
    });

  } catch (error) {

    console.error(
      "Insights error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to generate insights",
    });
  }
};