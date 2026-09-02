import { useState, useMemo } from "react";
import AppAnalyticsHeader from "../../components/AppAnalytics/AppAnalyticsHeader";
import AppSearchBar from "../../components/AppAnalytics/AppSearchBar";
import AppGrid from "../../components/AppAnalytics/AppGrid";
import AppDetails from "../../components/AppAnalytics/AppDetails";
import { useFeatureAnalytics } from "../../hooks/useFeatureAnalytics";
import { formatHour, formatMinutes } from "../../utils/formatters";

const ACTIVITY_COLORS = ["#EC4899", "#8B5CF6", "#0EA5E9", "#10B981", "#F59E0B"];
const formatActivityName = (name) => name.replace(/\b\w/g, (letter) => letter.toUpperCase());

function AppAnalytics() {
  const { data, loading, error } = useFeatureAnalytics();
  const [selectedApp, setSelectedApp] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Today");

  const apps = useMemo(() => (data?.apps || []).map((app, index) => ({
    id: app.name,
    name: app.name,
    icon: "📱",
    color: ["#8B5CF6", "#0EA5E9", "#10B981", "#F59E0B", "#EC4899"][index % 5],
    totalUsage: formatMinutes(app.totalMinutes),
    weeklyTotal: formatMinutes(app.totalMinutes),
    dailyAvg: formatMinutes(app.totalMinutes),
    sessionsToday: app.sessions,
    peakTime: formatHour(app.peakHour),
    trend: "Tracked today",
    trendDirection: "up",
    breakdown: app.activities.map((activity, activityIndex, allActivities) => {
      const total = allActivities.reduce((sum, item) => sum + item.minutes, 0) || 1;
      return {
        title: formatActivityName(activity.name),
        time: formatMinutes(activity.minutes),
        percent: Math.round((activity.minutes / total) * 100),
        color: ACTIVITY_COLORS[activityIndex % ACTIVITY_COLORS.length],
      };
    }),
    hourlyData: app.hourly.map((item) => ({ hour: formatHour(item.hour), min: item.minutes })),
    insight: app.activities.length ? `Most-used activity: ${app.activities[0].name} (${formatMinutes(app.activities[0].minutes)}).` : "Keep tracking to receive app-specific recommendations.",
  })), [data]);
  const filteredApps = useMemo(() => {
    if (!searchQuery.trim()) return apps;
    return apps.filter((app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [apps, searchQuery]);

  return (
    <div className="dashboard-page">
      <AppAnalyticsHeader
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <AppSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {loading && <p className="text-sm text-slate-400">Loading tracked app usage…</p>}
      {error && <p className="rounded-lg bg-red-500/10 p-4 text-sm text-red-300">{error}</p>}
      {!loading && !error && apps.length === 0 && <div className="glass-card p-8 text-sm text-slate-400">No app usage has been received today. Start the tracker, then this page will fill with your real app activity.</div>}

      {apps.length > 0 && <AppGrid
        apps={filteredApps}
          selectedApp={selectedApp || apps[0]}
        setSelectedApp={setSelectedApp}
      />}

      {apps.length > 0 && <AppDetails app={selectedApp || apps[0]} />}
    </div>
  );
}

export default AppAnalytics;
