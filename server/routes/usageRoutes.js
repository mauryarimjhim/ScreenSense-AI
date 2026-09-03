const express = require("express");

const router = express.Router();

const {
  addUsage,
  getUsage,
} = require("../controllers/usageController");

const { protect } = require("../middlewares/authMiddleware");
const { protectDevice } = require("../middlewares/authMiddleware");
const { syncUsage } = require("../controllers/usageController");


// Add usage
router.post("/", protect, addUsage);

// Native and desktop clients upload idempotent batches with their limited
// device token. Dashboard user tokens remain supported by the legacy route.
router.post("/sync", protectDevice, syncUsage);

// Get usage
router.get("/", protect, getUsage);


module.exports = router;
