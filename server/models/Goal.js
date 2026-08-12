const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    goalType: {
      type: String,
      enum: [
        "screen_time",
        "productive_time",
        "app_limit",
      ],
      required: true,
    },

    // For app_limit goals
    appName: {
      type: String,
      trim: true,
      default: null,
    },

    // Target in minutes
    targetMinutes: {
      type: Number,
      required: true,
      min: 1,
    },

    // daily / weekly
    period: {
      type: String,
      enum: ["daily", "weekly"],
      default: "daily",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);