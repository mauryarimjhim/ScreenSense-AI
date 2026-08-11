const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const { isConnected } = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

app.use("/api/auth", (req, res, next) => {
  if (isConnected()) {
    return next();
  }

  return res.status(503).json({
    success: false,
    message: "Database unavailable. Verify MongoDB Atlas access and that your IP is whitelisted.",
  });
});

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "screensense at backend running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    database: isConnected() ? "connected" : "disconnected",
  });
});

module.exports = app;
