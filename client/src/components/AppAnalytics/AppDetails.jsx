import { Clock, Zap, BarChart3, Layers } from "lucide-react";
import UsageBreakdown from "./UsageBreakdown";
import UsageTimelineChart from "./UsageTimelineChart";
import AIRecommendationCard from "./AIRecommendationCard";

function AppDetails({ app }) {
  if (!app) {
    return (
      <div className="glass-card flex items-center justify-center p-12">
        <p className="text-slate-500">Select an app to view detailed analytics.</p>
      </div>
    );
  }

  const miniStats = [
    { label: "Total Usage", value: app.totalUsage, icon: Clock, color: app.color },
    { label: "Peak Time", value: app.peakTime, icon: Zap, color: "#F59E0B" },
    { label: "Daily Avg", value: app.dailyAvg, icon: BarChart3, color: "#0EA5E9" },
    { label: "Sessions", value: app.sessionsToday, icon: Layers, color: "#10B981" },
  ];

  return (
    <div className="space-y-5">
      {/* App header */}
      <div className="glass-card p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
            style={{ backgroundColor: `${app.color}15` }}
          >
            {app.icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{app.name}</h2>
            <p className="mt-1 text-sm text-slate-400">
              Weekly total: {app.weeklyTotal}
            </p>
          </div>
        </div>

        {/* Mini stat cards */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {miniStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-800/60 bg-white/5 p-3"
            >
              <div className="mb-2 flex items-center gap-2">
                <stat.icon size={14} style={{ color: stat.color }} />
                <span className="text-xs text-slate-500">{stat.label}</span>
              </div>
              <p className="text-lg font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Breakdown + Chart */}
      <div className="grid gap-5 lg:grid-cols-2">
        <UsageBreakdown breakdown={app.breakdown} />
        <UsageTimelineChart data={app.hourlyData} color={app.color} />
      </div>

      {/* AI Insight */}
      <AIRecommendationCard
        insight={app.insight}
        appName={app.name}
        color={app.color}
      />
    </div>
  );
}

export default AppDetails;