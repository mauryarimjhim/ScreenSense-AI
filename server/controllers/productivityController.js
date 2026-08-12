const Usage = require("../models/Usage");

// ============================================
// GET PRODUCTIVITY SCORE
// GET /api/dashboard/productivity
// ============================================

exports.getProductivityScore = async (req, res) => {
  try {

    // Get usage data of logged-in user
    const usageData = await Usage.find({
      userId: req.user.id,
    });

    // No data
    if (usageData.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No usage data available yet",
        productivity: {
          score: 0,
          productiveTime: 0,
          neutralTime: 0,
          unproductiveTime: 0,
          totalScreenTime: 0,
        },
      });
    }

    // ------------------------------------------
    // Variables
    // ------------------------------------------

    let totalScreenTime = 0;
    let productiveTime = 0;
    let neutralTime = 0;
    let unproductiveTime = 0;


    // ------------------------------------------
    // Process usage records
    // ------------------------------------------

    usageData.forEach((record) => {

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

    });


    // ------------------------------------------
    // Calculate weighted productivity
    // ------------------------------------------

    const weightedTime =
      (productiveTime * 1) +
      (neutralTime * 0.5) +
      (unproductiveTime * 0);


    // ------------------------------------------
    // Calculate score
    // ------------------------------------------

    let score = 0;

    if (totalScreenTime > 0) {
      score =
        (weightedTime / totalScreenTime) * 100;
    }


    // Round score
    score = Math.round(score);


    // ------------------------------------------
    // Send response
    // ------------------------------------------

    return res.status(200).json({
      success: true,

      productivity: {
        score,
        productiveTime,
        neutralTime,
        unproductiveTime,
        totalScreenTime,
      },
    });

  } catch (error) {

    console.error(
      "Productivity score error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to calculate productivity score",
    });
  }
};