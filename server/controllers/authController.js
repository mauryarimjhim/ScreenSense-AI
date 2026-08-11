const User = require("../models/User");
const jwt = require("jsonwebtoken");

// ======================================================
// GENERATE JWT TOKEN
// ======================================================

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};


// ======================================================
// REGISTER USER
// POST /api/auth/register
// ======================================================

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // --------------------------------------------------
    // 1. Check required fields
    // --------------------------------------------------

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email and password",
      });
    }

    // --------------------------------------------------
    // 2. Normalize input
    // --------------------------------------------------

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    // --------------------------------------------------
    // 3. Validate name
    // --------------------------------------------------

    if (normalizedName.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 2 characters",
      });
    }

    // --------------------------------------------------
    // 4. Validate email
    // --------------------------------------------------

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // --------------------------------------------------
    // 5. Validate password
    // --------------------------------------------------

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // --------------------------------------------------
    // 6. Check JWT secret
    // --------------------------------------------------

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing from .env");

      return res.status(500).json({
        success: false,
        message: "Server authentication configuration is missing",
      });
    }

    // --------------------------------------------------
    // 7. Check if user already exists
    // --------------------------------------------------

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // --------------------------------------------------
    // 8. Create user
    // --------------------------------------------------
    // IMPORTANT:
    // User.js already hashes the password using
    // the mongoose pre-save hook.
    //
    // So DO NOT bcrypt.hash() here.

    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password: password,
    });

    // --------------------------------------------------
    // 9. Generate JWT
    // --------------------------------------------------

    const token = generateToken(user._id);

    // --------------------------------------------------
    // 10. Send response
    // --------------------------------------------------

    return res.status(201).json({
      success: true,
      message: "User registered successfully",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while registering user",
    });
  }
};


// ======================================================
// LOGIN USER
// POST /api/auth/login
// ======================================================

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // --------------------------------------------------
    // 1. Check required fields
    // --------------------------------------------------

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // --------------------------------------------------
    // 2. Normalize email
    // --------------------------------------------------

    const normalizedEmail = email.trim().toLowerCase();

    // --------------------------------------------------
    // 3. Validate email
    // --------------------------------------------------

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // --------------------------------------------------
    // 4. Check JWT secret
    // --------------------------------------------------

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing from .env");

      return res.status(500).json({
        success: false,
        message: "Server authentication configuration is missing",
      });
    }

    // --------------------------------------------------
    // 5. Find user
    // --------------------------------------------------

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // --------------------------------------------------
    // 6. Compare password
    // --------------------------------------------------

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // --------------------------------------------------
    // 7. Generate JWT
    // --------------------------------------------------

    const token = generateToken(user._id);

    // --------------------------------------------------
    // 8. Send response
    // --------------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging in",
    });
  }
};