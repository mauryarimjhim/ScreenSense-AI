const Notification = require("../models/Notification");

exports.listNotifications = async (req, res) => {
  const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(30);
  res.json({ success: true, notifications });
};

exports.markRead = async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { readAt: new Date() },
    { new: true },
  );
  if (!notification) return res.status(404).json({ success: false, message: "Notification not found" });
  res.json({ success: true, notification });
};
