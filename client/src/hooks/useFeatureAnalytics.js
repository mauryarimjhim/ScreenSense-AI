import { useEffect, useState } from "react";
import { analyticsApi, goalsApi, insightsApi } from "../services/api";

export function useFeatureAnalytics() {
  const [state, setState] = useState({ loading: true, data: null, insights: [], goalProgress: [], streak: 0, error: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setState((current) => ({ ...current, loading: false, error: "Sign in to view your tracked analytics." }));
      return undefined;
    }
    let active = true;
    const load = async () => {
      try {
        const [features, insightResponse, goalResponse] = await Promise.all([
          analyticsApi.features(token), insightsApi.get(token), goalsApi.progress(token),
        ]);
        if (active) setState({ loading: false, data: features, insights: insightResponse.insights || [], goalProgress: goalResponse.progress || [], streak: goalResponse.streak || 0, error: "" });
      } catch (error) {
        if (active) setState((current) => ({ ...current, loading: false, error: error.message || "Could not load analytics." }));
      }
    };
    load();
    return () => { active = false; };
  }, []);
  return state;
}
