const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  type: { type: String, enum: ["reminder", "goal", "insight"], required: true },
  title: { type: String, required: true, maxlength: 120 },
  message: { type: String, required: true, maxlength: 500 },
  dedupeKey: { type: String, required: true },
  readAt: { type: Date, default: null },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
}, { timestamps: true });

notificationSchema.index({ userId: 1, dedupeKey: 1 }, { unique: true });

module.exports = mongoose.model("Notification", notificationSchema);
