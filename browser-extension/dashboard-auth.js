// The dashboard owns authentication. This bridge only copies the current
// dashboard token into extension storage, where the background worker can use
// it for authenticated usage uploads.
function syncAuth(token, apiBase, dashboardOrigin) {
  chrome.runtime.sendMessage({ type: "SCREENSENSE_AUTH", token: token || null, apiBase, dashboardOrigin });
}

// This content script has broad match permissions so it can work on a deployed
// dashboard domain. Do not clear the saved dashboard session when it runs on an
// unrelated website that simply has no ScreenSense local-storage entry.
const token = window.localStorage.getItem("token");
if (token) syncAuth(token, undefined, window.location.origin);

window.addEventListener("message", (event) => {
  if (event.source !== window || event.data?.type !== "SCREENSENSE_AUTH") return;
  syncAuth(event.data.token, event.data.apiBase, window.location.origin);
});
