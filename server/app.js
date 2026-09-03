const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const usageRoutes = require("./routes/usageRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const productivityRoutes = require("./routes/productivityRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const goalRoutes = require("./routes/goalRoutes");
const insightRoutes = require("./routes/insightRoutes");
const deviceRoutes = require("./routes/deviceRoutes");

const { isConnected } = require("./config/db");

const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGINS || "").split(",").map((origin) => origin.trim()).filter(Boolean);
app.use(cors({ origin(origin, callback) {
  if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) return callback(null, true);
  return callback(new Error("Origin not allowed by CORS"));
} }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ScreenSense AI backend running",
  });
});


//dattabase check 
app.use("/api/auth", (req, res, next) => {
  if (isConnected()) {
    return next();
  }

  return res.status(503).json({
    success: false,
    message: "Database unavailable. Verify MongoDB Atlas access and that your IP is whitelisted.",
  });
});

//auth routes 
app.use("/api/auth", authRoutes);

//usage routes
app.use("/api/usage", usageRoutes);

//dashboard routes
app.use("/api/dashboard", dashboardRoutes);

app.use("/api/dashboard/productivity", productivityRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api/goals", goalRoutes);

app.use("/api/insights", insightRoutes);
app.use("/api/devices", deviceRoutes);

//api health check endpoint
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
