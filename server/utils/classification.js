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

module.exports = { getCategory };
