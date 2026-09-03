const Usage = require("../models/Usage");

const PLATFORM_DEVICE_TYPE = { windows: "laptop", android: "mobile", ios: "mobile" };
const SOURCES = new Set(["desktop", "android", "ios", "chrome"]);

function validateUsageEvent(event, device) {
  if (!event || typeof event !== "object") return "Each usage event must be an object";
  if (!event.appName || typeof event.appName !== "string" || event.appName.trim().length > 120) return "Each event requires an app name of 120 characters or fewer";
  if (!Number.isFinite(event.totalTime) || event.totalTime <= 0 || event.totalTime > 24 * 60) return "Each event requires a duration between 1 and 1440 minutes";
  if (event.date && Number.isNaN(new Date(event.date).getTime())) return "Each event date must be valid";
  if (event.source && !SOURCES.has(event.source)) return "Unsupported usage source";
  if (event.platform && event.platform !== device.platform) return "Event platform does not match the registered device";
  return null;
}

// ======================================================
// SYNC DEVICE USAGE
// POST /api/usage/sync
// ======================================================
exports.syncUsage = async (req, res) => {
  try {
    const { events } = req.body;
    if (!Array.isArray(events) || events.length === 0 || events.length > 500) {
      return res.status(400).json({ success: false, message: "Send between 1 and 500 usage events" });
    }
    const errors = events.map((event) => validateUsageEvent(event, req.device)).filter(Boolean);
    if (errors.length) return res.status(400).json({ success: false, message: errors[0] });

    const operations = events.map((event) => {
      const idempotencyKey = event.idempotencyKey;
      const document = {
        userId: req.device.userId,
        deviceId: req.device._id,
        source: event.source || req.device.clientType,
        idempotencyKey: idempotencyKey || null,
        deviceType: PLATFORM_DEVICE_TYPE[req.device.platform],
        platform: req.device.platform,
        appName: event.appName.trim(),
        totalTime: Math.round(event.totalTime),
        activities: event.activities || {},
        category: event.category || "neutral",
        date: event.date ? new Date(event.date) : new Date(),
      };
      // A deterministic key lets clients safely retry offline batches.
      if (idempotencyKey) return { updateOne: { filter: { deviceId: req.device._id, idempotencyKey }, update: { $setOnInsert: document }, upsert: true } };
      return { insertOne: { document } };
    });
    const result = await Usage.bulkWrite(operations, { ordered: false });
    req.device.lastSeenAt = new Date();
    await req.device.save();
    return res.status(201).json({ success: true, received: events.length, inserted: result.upsertedCount + result.insertedCount, duplicates: events.length - result.upsertedCount - result.insertedCount });
  } catch (error) {
    console.error("Device usage sync error:", error);
    return res.status(500).json({ success: false, message: "Failed to sync device usage" });
  }
};

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
