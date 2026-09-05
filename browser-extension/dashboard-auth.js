// The dashboard owns authentication. This bridge only copies the current
// dashboard token into extension storage, where the background worker can use
// it for authenticated usage uploads.
function syncAuth(token, apiBase) {
  chrome.runtime.sendMessage({ type: "SCREENSENSE_AUTH", token: token || null, apiBase });
}

syncAuth(window.localStorage.getItem("token"));

window.addEventListener("message", (event) => {
  if (event.source !== window || event.data?.type !== "SCREENSENSE_AUTH") return;
  syncAuth(event.data.token, event.data.apiBase);
});
