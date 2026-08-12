const express = require("express");

const router = express.Router();

const {
  getProductivityScore,
} = require("../controllers/productivityController");

const {
  protect,
} = require("../middlewares/authMiddleware");


// Productivity score
router.get(
  "/",
  protect,
  getProductivityScore
);


module.exports = router;