const express = require("express");

const router = express.Router();

const {
  addUsage,
  getUsage,
} = require("../controllers/usageController");

const { protect } = require("../middlewares/authMiddleware");


// Add usage
router.post("/", protect, addUsage);

// Get usage
router.get("/", protect, getUsage);


module.exports = router;