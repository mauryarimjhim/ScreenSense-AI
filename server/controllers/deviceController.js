const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Device = require("../models/Device");

const platforms = ["windows", "android", "ios"];
const clientTypes = ["desktop", "android", "ios", "chrome"];

const signAccessToken = (device) => jwt.sign(
  { id: device.userId.toString(), deviceId: device._id.toString(), tokenType: "device", scopes: ["usage:write"] },
  process.env.JWT_SECRET,
  { expiresIn: "15m" }
);
const createRefreshToken = () => crypto.randomBytes(48).toString("base64url");
const deviceResponse = (device, accessToken, refreshToken) => ({
  device: { id: device._id, deviceName: device.deviceName, platform: device.platform, clientType: device.clientType },
  accessToken,
  refreshToken,
});

exports.registerDevice = async (req, res) => {
  try {
    const { installationId, platform, clientType, deviceName } = req.body;
    if (!installationId || !platform || !clientType || !deviceName) return res.status(400).json({ success: false, message: "installationId, platform, clientType and deviceName are required" });
    if (!platforms.includes(platform) || !clientTypes.includes(clientType)) return res.status(400).json({ success: false, message: "Unsupported platform or client type" });
    const refreshToken = createRefreshToken();
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    const device = await Device.findOneAndUpdate(
      { userId: req.user.id, installationId: installationId.slice(0, 160) },
      { platform, clientType, deviceName: deviceName.trim(), refreshTokenHash, lastSeenAt: new Date(), isActive: true },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.status(201).json({ success: true, ...deviceResponse(device, signAccessToken(device), refreshToken) });
  } catch (error) {
    console.error("Register device error:", error);
    return res.status(500).json({ success: false, message: "Could not register device" });
  }
};

exports.refreshDeviceToken = async (req, res) => {
  try {
    const { deviceId, refreshToken } = req.body;
    if (!deviceId || !refreshToken) return res.status(400).json({ success: false, message: "deviceId and refreshToken are required" });
    const device = await Device.findOne({ _id: deviceId, isActive: true });
    if (!device || !(await bcrypt.compare(refreshToken, device.refreshTokenHash))) return res.status(401).json({ success: false, message: "Invalid device refresh token" });
    const nextRefreshToken = createRefreshToken();
    device.refreshTokenHash = await bcrypt.hash(nextRefreshToken, 10);
    device.lastSeenAt = new Date();
    await device.save();
    return res.json({ success: true, ...deviceResponse(device, signAccessToken(device), nextRefreshToken) });
  } catch {
    return res.status(401).json({ success: false, message: "Could not refresh device token" });
  }
};

exports.listDevices = async (req, res) => {
  const devices = await Device.find({ userId: req.user.id }).select("deviceName platform clientType lastSeenAt isActive createdAt").sort({ lastSeenAt: -1 });
  res.json({ success: true, devices });
};

exports.revokeDevice = async (req, res) => {
  const device = await Device.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, { isActive: false }, { new: true });
  if (!device) return res.status(404).json({ success: false, message: "Device not found" });
  return res.json({ success: true, message: "Device revoked" });
};
