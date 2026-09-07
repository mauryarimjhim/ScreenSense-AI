const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { listNotifications, markRead } = require("../controllers/notificationController");

const router = express.Router();
router.get("/", protect, listNotifications);
router.patch("/:id/read", protect, markRead);
module.exports = router;
