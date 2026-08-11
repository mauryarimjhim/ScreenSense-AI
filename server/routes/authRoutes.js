const express = require("express");

const router = express.Router();


const { registerUser,loginUser } = require("../controllers/authController");
const {protect} =require ("../middlewares/authMiddleware");
const User = require("../models/User");
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User profile accessed",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports =router;
