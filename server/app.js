const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const usageRoutes = require("./routes/usageRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const productivityRoutes = require("./routes/productivityRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const goalRoutes = require("./routes/goalRoutes");
const insightRoutes = require("./routes/insightRoutes");
const deviceRoutes = require("./routes/deviceRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const { isConnected } = require("./config/db");

const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGINS || "").split(",").map((origin) => origin.trim()).filter(Boolean);
const isProduction = process.env.NODE_ENV === "production";
app.disable("x-powered-by");
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin(origin, callback) {
  // Browser-tracker requests originate from the installed Chrome extension.
  // They still require a valid user token, but must pass CORS after deployment.
  const isBrowserExtension = /^chrome-extension:\/\//.test(origin || "");
  if (!origin || isBrowserExtension || allowedOrigins.includes(origin) || (!isProduction && allowedOrigins.length === 0)) return callback(null, true);
  return callback(new Error("Origin not allowed by CORS"));
} }));
app.use(express.json({ limit: "100kb" }));
app.use("/api/auth", rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false, message: { success: false, message: "Too many authentication attempts. Try again later." } }));

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
app.use("/api/notifications", notificationRoutes);

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
