import { useEffect } from "react";
import { notificationApi } from "../services/api";

const SEEN_KEY = "screensense-seen-notifications";

export function requestNotificationPermission() {
  if (!("Notification" in window)) return Promise.resolve("unsupported");
  return Notification.requestPermission();
}

export default function useNotifications() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return undefined;
    const seen = new Set(JSON.parse(localStorage.getItem(SEEN_KEY) || "[]"));
    const check = async () => {
      try {
        const data = await notificationApi.list(token);
        for (const item of data.notifications.filter((notification) => !notification.readAt && !seen.has(notification._id))) {
          seen.add(item._id);
          if (Notification.permission === "granted") new Notification(item.title, { body: item.message, tag: item._id });
        }
        localStorage.setItem(SEEN_KEY, JSON.stringify([...seen].slice(-100)));
      } catch (error) {
        console.warn("Notifications could not be loaded:", error.message);
      }
    };
    void check();
    const interval = window.setInterval(() => void check(), 60_000);
    return () => window.clearInterval(interval);
  }, []);
}
