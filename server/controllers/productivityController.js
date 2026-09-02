const Usage = require("../models/Usage");

function getDayRange(dayOffset = 0) {
  const start = new Date();
  start.setDate(start.getDate() + dayOffset);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  return { start, end };
}

function calculateTotals(usageData) {
  let totalScreenTime = 0;
  let productiveTime = 0;
  let neutralTime = 0;
  let unproductiveTime = 0;

  usageData.forEach((record) => {
    totalScreenTime += record.totalTime;

    if (record.category === "productive") {
      productiveTime += record.totalTime;
    } else if (record.category === "unproductive") {
      unproductiveTime += record.totalTime;
    } else {
      neutralTime += record.totalTime;
    }
  });

  return {
    totalScreenTime,
    productiveTime,
    neutralTime,
    unproductiveTime,
  };
}

function calculateProductivityScore(totals) {
  const { totalScreenTime, productiveTime, neutralTime, unproductiveTime } = totals;

  if (totalScreenTime <= 0) {
    return 0;
  }

  const weightedTime =
    productiveTime * 1 +
    neutralTime * 0.5 +
    unproductiveTime * 0;

  return Math.round((weightedTime / totalScreenTime) * 100);
}

function calculateFocusScore(totals, contextSwitches) {
  const { totalScreenTime, productiveTime, unproductiveTime } = totals;

  if (totalScreenTime <= 0) {
    return 0;
  }

  const productiveRatio = productiveTime / totalScreenTime;
  const unproductiveRatio = unproductiveTime / totalScreenTime;
  const switchPenalty = Math.min(contextSwitches / 30, 1);

  const score =
    productiveRatio * 50 +
    (1 - unproductiveRatio) * 30 +
    (1 - switchPenalty) * 20;

  return Math.round(score);
}

function calculatePercentChange(current, previous) {
  if (previous <= 0) {
    return current > 0 ? 100 : 0;
  }

  return Math.round(((current - previous) / previous) * 100);
}

// ============================================
// GET PRODUCTIVITY SCORE
// GET /api/dashboard/productivity
// ============================================

exports.getProductivityScore = async (req, res) => {
  try {
    const { start: startOfDay, end: endOfDay } = getDayRange(0);
    const { start: startOfYesterday, end: endOfYesterday } = getDayRange(-1);

    const [todayUsage, yesterdayUsage] = await Promise.all([
      Usage.find({
        userId: req.user.id,
        date: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      }),
      Usage.find({
        userId: req.user.id,
        date: {
          $gte: startOfYesterday,
          $lt: endOfYesterday,
        },
      }),
    ]);

    if (todayUsage.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No usage data available yet",
        productivity: {
          score: 0,
          focusScore: 0,
          contextSwitches: 0,
          productiveTime: 0,
          neutralTime: 0,
          unproductiveTime: 0,
          totalScreenTime: 0,
          screenTimeChange: 0,
          productivityChange: 0,
          focusChange: 0,
        },
      });
    }

    const todayTotals = calculateTotals(todayUsage);
    const yesterdayTotals = calculateTotals(yesterdayUsage);

    const score = calculateProductivityScore(todayTotals);
    const yesterdayScore = calculateProductivityScore(yesterdayTotals);
    const contextSwitches = todayUsage.length;
    const focusScore = calculateFocusScore(todayTotals, contextSwitches);

    const yesterdayFocus = calculateFocusScore(
      yesterdayTotals,
      yesterdayUsage.length
    );

    return res.status(200).json({
      success: true,

      productivity: {
        score,
        focusScore,
        contextSwitches,
        productiveTime: todayTotals.productiveTime,
        neutralTime: todayTotals.neutralTime,
        unproductiveTime: todayTotals.unproductiveTime,
        totalScreenTime: todayTotals.totalScreenTime,
        screenTimeChange: calculatePercentChange(
          todayTotals.totalScreenTime,
          yesterdayTotals.totalScreenTime
        ),
        productivityChange: calculatePercentChange(score, yesterdayScore),
        focusChange: calculatePercentChange(focusScore, yesterdayFocus),
      },
    });
  } catch (error) {
    console.error("Productivity score error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to calculate productivity score",
    });
  }
};
