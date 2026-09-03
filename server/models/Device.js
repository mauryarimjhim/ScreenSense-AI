const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  installationId: { type: String, required: true, trim: true },
  platform: { type: String, enum: ["windows", "android", "ios"], required: true },
  clientType: { type: String, enum: ["desktop", "android", "ios", "chrome"], required: true },
  deviceName: { type: String, required: true, trim: true, maxlength: 100 },
  refreshTokenHash: { type: String, required: true },
  lastSeenAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

deviceSchema.index({ userId: 1, installationId: 1 }, { unique: true });

module.exports = mongoose.model("Device", deviceSchema);
