let currentActivity = null;
let activityStartTime = null;

const activityUsage = {};

const DEFAULT_API_BASE = "http://127.0.0.1:5000/api";
const UPLOAD_ALARM = "screensense-upload";

function saveTrackingState() {
  chrome.storage.local.set({ activityUsage, currentActivity, activityStartTime });
}

async function restoreTrackingState() {
  const saved = await chrome.storage.local.get(["activityUsage", "currentActivity", "activityStartTime"]);
  Object.assign(activityUsage, saved.activityUsage || {});
  currentActivity = saved.currentActivity || null;
  activityStartTime = saved.activityStartTime || null;
}

async function getToken() {
  const { authToken } = await chrome.storage.local.get("authToken");
  return authToken;
}

async function getApiBase() {
  const { apiBase } = await chrome.storage.local.get("apiBase");
  return (apiBase || DEFAULT_API_BASE).replace(/\/$/, "");
}

function getCategory(appName, activity) {
  const productive = {
    LinkedIn: ["jobs"],
    YouTube: ["search"],
  };

  const unproductive = {
    YouTube: ["shorts"],
    Instagram: ["reels", "stories", "explore"],
  };

  if (productive[appName]?.includes(activity)) {
    return "productive";
  }

  if (unproductive[appName]?.includes(activity)) {
    return "unproductive";
  }

  return "neutral";
}

function getDominantActivity(activities) {
  const entries = Object.entries(activities);

  if (entries.length === 0) {
    return null;
  }

  return entries.sort((a, b) => b[1] - a[1])[0][0];
}

async function sendUsageToBackend() {
  try {
    const token = await getToken();
    if (!token) {
      console.warn("ScreenSense: open the dashboard and sign in before tracking usage.");
      return;
    }
    const apiBase = await getApiBase();
    for (const [appName, activities] of Object.entries(activityUsage)) {

      // Calculate total time for this app
      const totalSeconds = Object.values(activities).reduce(
        (sum, time) => sum + time,
        0
      );

      const totalMinutes = Math.floor(totalSeconds / 60);

      // Don't send empty usage
      if (totalMinutes <= 0) {
        continue;
      }

      const dominantActivity = getDominantActivity(activities);
      const category = dominantActivity
        ? getCategory(appName, dominantActivity)
        : "neutral";

      const response = await fetch(
        `${apiBase}/usage`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },

          body: JSON.stringify({
            deviceType: "laptop",
            platform: "windows",

            appName: appName,

            totalTime: totalMinutes,

            activities: Object.fromEntries(Object.entries(activities).map(([name, seconds]) => [name, Math.round(seconds / 60)])),

            category: category
          })
        }
      );

      const data = await response.json();

      console.log(
        "ScreenSense backend response:",
        data
      );

      if (data.success) {
        activityUsage[appName] = {};
        saveTrackingState();
      } else {
        console.error("ScreenSense upload rejected:", data.message || data);
        }
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


  // Track all normal web pages as browser screen time. Known services above
  // retain their richer activity labels; other sites are grouped by hostname.
  try {
    const parsed = new URL(url);
    if (!/^https?:$/.test(parsed.protocol)) return null;
    const host = parsed.hostname.replace(/^www\./, "");
    const appName = host.split(".")[0].replace(/[-_]/g, " ");
    return {
      appName: appName.charAt(0).toUpperCase() + appName.slice(1),
      activity: "browsing",
    };
  } catch {
    return null;
  }
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

  saveTrackingState();

console.log(
  "Total activity usage:",
  activityUsage
);

  console.log(
    "------------------------------"
  );


  currentActivity = null;

  activityStartTime = null;
  saveTrackingState();
}

// Save elapsed time without ending the current session. The previous version
// called this function but never defined it, preventing every upload.
function flushCurrentActivity() {
  if (!currentActivity || !activityStartTime) return;
  const elapsedSeconds = Math.floor((Date.now() - activityStartTime) / 1000);
  if (elapsedSeconds <= 0) return;
  const { appName, activity } = currentActivity;
  activityUsage[appName] ||= {};
  activityUsage[appName][activity] = (activityUsage[appName][activity] || 0) + elapsedSeconds;
  activityStartTime = Date.now();
  saveTrackingState();
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

// Do not count time while Chrome is not the focused application.
chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    stopTracking();
    return;
  }
  chrome.tabs.query({ active: true, windowId }).then(([tab]) => {
    if (tab?.id) checkTab(tab.id);
  });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message?.type === "SCREENSENSE_AUTH") {
    if (message.token) {
      const updates = { authToken: message.token };
      if (typeof message.apiBase === "string" && /^https?:\/\//.test(message.apiBase)) {
        updates.apiBase = message.apiBase.replace(/\/$/, "");
      }
      chrome.storage.local.set(updates);
      console.log("ScreenSense: dashboard account connected.");
    } else {
      chrome.storage.local.remove("authToken");
      console.log("ScreenSense: dashboard account disconnected.");
    }
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create(UPLOAD_ALARM, { periodInMinutes: 1 });
});

chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.create(UPLOAD_ALARM, { periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name !== UPLOAD_ALARM) return;
  flushCurrentActivity();
  sendUsageToBackend();
});

restoreTrackingState().then(async () => {
  chrome.alarms.create(UPLOAD_ALARM, { periodInMinutes: 1 });
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  if (tab?.id) checkTab(tab.id);
});
