import { activeWindow } from "get-windows";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.API_URL;
const JWT_TOKEN = process.env.JWT_TOKEN;

const usage = {};

let previousApp = null;
let lastCheckTime = Date.now();


// ======================================================
// Convert process name to readable application name
// ======================================================

function getAppName(processName) {
  const name = processName.toLowerCase();

  if (name.includes("chrome")) return "Chrome";
  if (name.includes("code")) return "VS Code";
  if (name.includes("spotify")) return "Spotify";
  if (name.includes("msedge")) return "Microsoft Edge";
  if (name.includes("firefox")) return "Firefox";
  if (name.includes("discord")) return "Discord";
  if (name.includes("explorer")) return "File Explorer";
  if (name.includes("postman")) return "Postman";

  return processName;
}


// ======================================================
// Determine productivity category
// ======================================================

function getCategory(appName) {
  const productiveApps = [
    "VS Code",
    "Postman"
  ];

  const unproductiveApps = [
    "Spotify",
    "Discord"
  ];

  if (productiveApps.includes(appName)) {
    return "productive";
  }

  if (unproductiveApps.includes(appName)) {
    return "unproductive";
  }

  return "neutral";
}


// ======================================================
// Track active application
// ======================================================

async function trackUsage() {
  try {

    const window = await activeWindow();

    if (!window) {
      return;
    }

    const processName = window.owner.name;

    const currentApp = getAppName(processName);

    const now = Date.now();

    const elapsedSeconds =
      (now - lastCheckTime) / 1000;

    lastCheckTime = now;


    // Initialize app
    if (!usage[currentApp]) {
      usage[currentApp] = 0;
    }


    // Add time
    usage[currentApp] += elapsedSeconds;


    // Show application change
    if (currentApp !== previousApp) {

      console.log("\n==============================");

      console.log(
        "Active application:",
        currentApp
      );

      console.log(
        "Window:",
        window.title
      );

      console.log("==============================");

      previousApp = currentApp;
    }


    console.log(
      `${currentApp}: ${usage[currentApp].toFixed(1)} seconds`
    );

  } catch (error) {

    console.error(
      "Tracking error:",
      error.message
    );
  }
}


// ======================================================
// Send usage to backend
// ======================================================

async function flushUsage() {

  console.log("\n========== SENDING USAGE ==========");

  for (const [appName, seconds] of Object.entries(usage)) {

    const minutes = Math.round(seconds / 60);

    // Don't send tiny values
    if (minutes <= 0) {
      continue;
    }

    try {

      await axios.post(
        `${API_URL}/api/usage`,
        {
          deviceType: "laptop",
          platform: "windows",

          appName,

          totalTime: minutes,

          activities: {},

          category: getCategory(appName)
        },
        {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
            "Content-Type": "application/json"
          }
        }
      );

      console.log(
        `✓ ${appName}: ${minutes} minutes sent`
      );

      // Reset after successful upload
      usage[appName] = 0;

    } catch (error) {

      console.error(
        `✗ Failed to send ${appName}:`,
        error.response?.data || error.message
      );
    }
  }

  console.log("====================================\n");
}


// ======================================================
// Start tracker
// ======================================================

console.log("====================================");
console.log("      ScreenSense Desktop Tracker");
console.log("====================================");
console.log("Tracking started...");
console.log("Backend:", API_URL);

if (!API_URL || !JWT_TOKEN) {
  console.error("Missing API_URL or JWT_TOKEN. Copy .env.example to .env and fill in both values.");
  process.exit(1);
}


// Check active application every second
setInterval(trackUsage, 1000);


// Send completed minutes every minute so the dashboard stays near real time.
setInterval(flushUsage, 60 * 1000);

// Preserve any whole minutes when the tracker is stopped from the terminal.
process.on("SIGINT", async () => {
  await flushUsage();
  process.exit(0);
});
