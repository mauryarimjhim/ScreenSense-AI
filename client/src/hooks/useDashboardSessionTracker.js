import { useEffect, useRef } from "react";
import { usageApi } from "../services/api";

const APP_NAME = "ScreenSense AI";
const ACTIVITY_NAME = "dashboard";

// Tracks time spent actively using the signed-in dashboard. This is deliberately
// limited to the ScreenSense tab; a website cannot inspect other sites or apps.
export default function useDashboardSessionTracker() {
  const unsentSeconds = useRef(0);
  const activeSince = useRef(null);
  const uploading = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return undefined;

    const addActiveTime = () => {
      if (activeSince.current === null) return;
      unsentSeconds.current += Math.max(0, (Date.now() - activeSince.current) / 1000);
      activeSince.current = Date.now();
    };

    const uploadCompletedMinutes = async (keepalive = false) => {
      addActiveTime();
      const minutes = Math.floor(unsentSeconds.current / 60);
      if (minutes < 1 || uploading.current) return;

      uploading.current = true;
      try {
        await usageApi.add(token, {
          deviceType: "laptop",
          platform: "windows",
          appName: APP_NAME,
          totalTime: minutes,
          activities: { [ACTIVITY_NAME]: minutes },
          category: "productive",
        }, { keepalive });
        unsentSeconds.current -= minutes * 60;
      } catch (error) {
        // Keep the elapsed time in memory and retry on the next interval.
        console.warn("ScreenSense dashboard session was not uploaded:", error.message);
      } finally {
        uploading.current = false;
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        addActiveTime();
        activeSince.current = null;
        void uploadCompletedMinutes(true);
      } else {
        activeSince.current = Date.now();
      }
    };

    if (document.visibilityState === "visible") activeSince.current = Date.now();
    document.addEventListener("visibilitychange", onVisibilityChange);
    const interval = window.setInterval(() => void uploadCompletedMinutes(), 30_000);

    return () => {
      addActiveTime();
      void uploadCompletedMinutes(true);
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);
}
