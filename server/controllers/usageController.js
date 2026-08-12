const Usage = require("../models/Usage");

// ======================================================
// ADD USAGE
// POST /api/usage
// ======================================================

exports.addUsage = async (req, res) => {
  try {
    const {
      deviceType,
      platform,
      appName,
      totalTime,
      activities,
      category,
      date,
    } = req.body;


    // --------------------------------------------------
    // Validate required fields
    // --------------------------------------------------

    if (
      !deviceType ||
      !platform ||
      !appName ||
      totalTime === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Device type, platform, app name and total time are required",
      });
    }


    // --------------------------------------------------
    // Validate device type
    // --------------------------------------------------

    if (!["laptop", "mobile"].includes(deviceType)) {
      return res.status(400).json({
        success: false,
        message: "Device type must be laptop or mobile",
      });
    }


    // --------------------------------------------------
    // Validate platform
    // --------------------------------------------------

    if (!["windows", "android", "ios"].includes(platform)) {
      return res.status(400).json({
        success: false,
        message:
          "Platform must be windows, android or ios",
      });
    }


    // --------------------------------------------------
    // Create usage record
    // --------------------------------------------------

    const usage = await Usage.create({
      userId: req.user.id,

      deviceType,
      platform,

      appName: appName.trim(),

      totalTime,

      activities: activities || {},

      category: category || "neutral",

      date: date || new Date(),
    });


    // --------------------------------------------------
    // Response
    // --------------------------------------------------

    return res.status(201).json({
      success: true,
      message: "Usage added successfully",
      data: usage,
    });

  } catch (error) {

    console.error("Add usage error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add usage data",
    });
  }
};


// ======================================================
// GET USAGE
// GET /api/usage
// ======================================================

exports.getUsage = async (req, res) => {
  try {

    const usage = await Usage.find({
      userId: req.user.id,
    }).sort({
      date: -1,
    });


    return res.status(200).json({
      success: true,
      count: usage.length,
      usage,
    });

  } catch (error) {

    console.error("Get usage error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch usage data",
    });
  }
};