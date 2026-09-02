export function isAuthenticated() {
  return Boolean(localStorage.getItem("token"));
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.postMessage({ type: "SCREENSENSE_AUTH", token: null }, window.location.origin);
}
