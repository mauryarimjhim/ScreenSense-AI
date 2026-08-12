const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const usageRoutes = require("./routes/usageRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const productivityRoutes = require("./routes/productivityRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const goalRoutes = require("./routes/goalRoutes");
const insightRoutes = require("./routes/insightRoutes");

const { isConnected } = require("./config/db");

const app = express();

app.use(cors());
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
