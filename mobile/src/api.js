import * as SecureStore from "expo-secure-store";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:5000/api";
const TOKEN_KEY = "screensense_mobile_token";
const DEVICE_KEY = "screensense_mobile_device";
const INSTALLATION_KEY = "screensense_mobile_installation";

async function request(path, options = {}, token) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
    ...options,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.message || "Request failed");
  return body;
}

export const session = {
  getToken: () => SecureStore.getItemAsync(TOKEN_KEY),
  save: (token) => SecureStore.setItemAsync(TOKEN_KEY, token),
  clear: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(DEVICE_KEY);
  },
};

export const authApi = {
  login: (email, password) => request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
};

export const analyticsApi = {
  features: async () => request("/analytics/features", {}, await session.getToken()),
};

export async function getInstallationId() {
  const existingId = await SecureStore.getItemAsync(INSTALLATION_KEY);
  if (existingId) return existingId;
  const installationId = `mobile-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  await SecureStore.setItemAsync(INSTALLATION_KEY, installationId);
  return installationId;
}

export async function registerMobileDevice(platform) {
  const token = await session.getToken();
  const response = await request("/devices/register", {
    method: "POST",
    body: JSON.stringify({ platform, clientType: platform, installationId: await getInstallationId(), deviceName: "ScreenSense Mobile" }),
  }, token);
  await SecureStore.setItemAsync(DEVICE_KEY, JSON.stringify(response));
  return response;
}
