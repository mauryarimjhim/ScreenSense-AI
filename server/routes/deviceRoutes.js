const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { registerDevice, refreshDeviceToken, listDevices, revokeDevice } = require("../controllers/deviceController");
const router = express.Router();

router.post("/register", protect, registerDevice);
router.post("/refresh", refreshDeviceToken);
router.get("/", protect, listDevices);
router.delete("/:id", protect, revokeDevice);

module.exports = router;
