const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
export const authApi = {
  register: (payload) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  login: (payload) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

export const healthApi = {
  check: () => request("/health"),
};
export const dashboardApi = {

   analytics: (token) =>
    request("/dashboard/analytics", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  productivity: (token) =>
    request("/dashboard/productivity", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  activityAnalytics: (token) =>
    request("/dashboard/activity-analytics", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export const usageApi = {
  getUsage: (token) =>
    request("/usage", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export const analyticsApi = {
  weekly: (token) =>
    request("/analytics/weekly", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  daily: (token) =>
    request("/analytics/daily", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  features: (token) =>
    request("/analytics/features", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export const insightsApi = {
  get: (token) =>
    request("/insights", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export const goalsApi = {
  getAll: (token) => request("/goals", { headers: { Authorization: `Bearer ${token}` } }),
  create: (token, payload) => request("/goals", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) }),
  remove: (token, id) => request(`/goals/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }),
  progress: (token) =>
    request("/goals/progress", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
