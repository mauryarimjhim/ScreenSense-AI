const mongoose = require("mongoose");

const usageSchema = new mongoose.Schema(
  {
    // ------------------------------------------
    // User
    // ------------------------------------------
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },


    // ------------------------------------------
    // Device information
    // ------------------------------------------
    deviceType: {
      type: String,
      enum: ["laptop", "mobile"],
      required: true,
    },

    platform: {
      type: String,
      enum: ["windows", "android", "ios"],
      required: true,
    },


    // ------------------------------------------
    // Application
    // ------------------------------------------
    appName: {
      type: String,
      required: true,
      trim: true,
    },


    // ------------------------------------------
    // Total time spent on app
    // Time is stored in minutes
    // ------------------------------------------
    totalTime: {
      type: Number,
      required: true,
      min: 0,
    },


    // ------------------------------------------
    // Activity-wise usage
    //
    // Example:
    //
    // activities: {
    //   reels: 60,
    //   stories: 15,
    //   posts: 10
    // }
    // ------------------------------------------
    activities: {
      type: Map,
      of: {
        type: Number,
        min: 0,
      },
      default: {},
    },


    // ------------------------------------------
    // Productivity category
    // ------------------------------------------
    category: {
      type: String,
      enum: ["productive", "unproductive", "neutral"],
      default: "neutral",
    },


    // ------------------------------------------
    // Date of usage
    // ------------------------------------------
    date: {
      type: Date,
      default: Date.now,
    },
  },

  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Usage", usageSchema);