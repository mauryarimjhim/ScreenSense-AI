let currentActivity = null;
let activityStartTime = null;

const activityUsage = {};

const API_URL = "http://localhost:5000";
const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhN2IwZGQ5YzMzYjczZjM5ODgxMGU1NSIsImlhdCI6MTc4NjQ0OTM4MiwiZXhwIjoxNzg3MDU0MTgyfQ.baFyQbM9hhUPmjHhB8dGhWMu-OrVhgdgrHjUmWOGZOs";

async function sendUsageToBackend() {
  try {
    for (const [appName, activities] of Object.entries(activityUsage)) {

      // Calculate total time for this app
      const totalSeconds = Object.values(activities).reduce(
        (sum, time) => sum + time,
        0
      );

      const totalMinutes = Math.round(totalSeconds / 60);

      // Don't send empty usage
      if (totalMinutes <= 0) {
        continue;
      }

      const response = await fetch(
        `${API_URL}/api/usage`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JWT_TOKEN}`
          },

          body: JSON.stringify({
            deviceType: "laptop",
            platform: "windows",

            appName: appName,

            totalTime: totalMinutes,

            activities: activities,

            category: "neutral"
          })
        }
      );

      const data = await response.json();

      console.log(
        "ScreenSense backend response:",
        data
      );
    }

  } catch (error) {

    console.error(
      "Failed to send usage:",
      error
    );
  }
}
// ======================================================
// Detect activity from URL
// ======================================================

function detectActivity(url) {

  if (!url) {
    return null;
  }


  // -------------------------
  // YouTube
  // -------------------------

  if (url.includes("youtube.com")) {

    if (url.includes("/shorts")) {
      return {
        appName: "YouTube",
        activity: "shorts"
      };
    }

    if (url.includes("/results")) {
      return {
        appName: "YouTube",
        activity: "search"
      };
    }

    return {
      appName: "YouTube",
      activity: "videos"
    };
  }


  // -------------------------
  // Instagram
  // -------------------------

  if (url.includes("instagram.com")) {

    if (url.includes("/reels")) {
      return {
        appName: "Instagram",
        activity: "reels"
      };
    }

    if (url.includes("/stories")) {
      return {
        appName: "Instagram",
        activity: "stories"
      };
    }

    if (url.includes("/direct")) {
      return {
        appName: "Instagram",
        activity: "chats"
      };
    }

    if (url.includes("/explore")) {
      return {
        appName: "Instagram",
        activity: "explore"
      };
    }

    return {
      appName: "Instagram",
      activity: "posts"
    };
  }


  // -------------------------
  // LinkedIn
  // -------------------------

  if (url.includes("linkedin.com")) {

    if (url.includes("/jobs")) {
      return {
        appName: "LinkedIn",
        activity: "jobs"
      };
    }

    if (url.includes("/messaging")) {
      return {
        appName: "LinkedIn",
        activity: "chats"
      };
    }

    return {
      appName: "LinkedIn",
      activity: "feed"
    };
  }


  // -------------------------
  // Spotify
  // -------------------------

  if (url.includes("spotify.com")) {

    return {
      appName: "Spotify",
      activity: "music"
    };
  }


  return null;
}


// ======================================================
// Start tracking activity
// ======================================================

function startTracking(activity) {

  if (!activity) {
    return;
  }


  // If same activity, don't restart timer
  if (
    currentActivity &&
    currentActivity.appName === activity.appName &&
    currentActivity.activity === activity.activity
  ) {
    return;
  }


  // Save previous activity first
  stopTracking();


  currentActivity = activity;

  activityStartTime = Date.now();


  console.log(
    "Started tracking:",
    currentActivity
  );
}


// ======================================================
// Stop tracking current activity
// ======================================================

function stopTracking() {

  if (
    !currentActivity ||
    !activityStartTime
  ) {
    return;
  }


  const elapsedSeconds =
    Math.floor(
      (Date.now() - activityStartTime) / 1000
    );


  console.log(
    "Activity:",
    currentActivity.appName
  );

  console.log(
    "Type:",
    currentActivity.activity
  );

  console.log(
    "Time:",
    elapsedSeconds,
    "seconds"
  );

  // Store usage by app and activity
if (!activityUsage[currentActivity.appName]) {
  activityUsage[currentActivity.appName] = {};
}

if (!activityUsage[currentActivity.appName][currentActivity.activity]) {
  activityUsage[currentActivity.appName][currentActivity.activity] = 0;
}

activityUsage[currentActivity.appName][currentActivity.activity] += elapsedSeconds;

console.log(
  "Total activity usage:",
  activityUsage
);

  console.log(
    "------------------------------"
  );


  currentActivity = null;

  activityStartTime = null;
}


// ======================================================
// Check active tab
// ======================================================

async function checkTab(tabId) {

  try {

    const tab =
      await chrome.tabs.get(tabId);


    const activity =
      detectActivity(tab.url);


    if (activity) {

      startTracking(activity);

    } else {

      stopTracking();

    }

  } catch (error) {

    console.error(
      "Tab detection error:",
      error
    );
  }
}


// ======================================================
// User switches tabs
// ======================================================

chrome.tabs.onActivated.addListener(
  (activeInfo) => {

    checkTab(activeInfo.tabId);

  }
);


// ======================================================
// URL changes inside same tab
// ======================================================

chrome.tabs.onUpdated.addListener(
  (tabId, changeInfo) => {

    if (changeInfo.url) {

      checkTab(tabId);

    }

  }
);

setInterval(
  sendUsageToBackend,
  30 * 1000
);