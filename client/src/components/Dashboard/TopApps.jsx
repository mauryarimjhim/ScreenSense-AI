import { useEffect, useState } from "react";
import { dashboardApi } from "../../services/api";

function TopApps() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const data = await dashboardApi.analytics(token);

        const appUsage = data.analytics?.appUsage || [];

        const maxTime = appUsage.length
          ? Math.max(...appUsage.map((app) => app.totalTime))
          : 1;

        const colors = [
          "#8B5CF6",
          "#EC4899",
          "#0EA5E9",
          "#10B981",
          "#F59E0B",
        ];

        const formattedApps = appUsage
          .slice(0, 5)
          .map((app, index) => ({
            name: app.appName,
            time: `${app.totalTime} min`,
            percent: Math.round(
              (app.totalTime / maxTime) * 100
            ),
            color: colors[index % colors.length],
          }));

        setApps(formattedApps);
      } catch (error) {
        console.error("Failed to fetch top apps:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();

    const interval = setInterval(fetchApps, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card p-5 sm:p-6">
      <h2 className="mb-5 text-lg font-semibold text-white">
        Top Apps Today
      </h2>

      {loading ? (
        <p className="text-sm text-slate-400">
          Loading apps...
        </p>
      ) : apps.length === 0 ? (
        <p className="text-sm text-slate-400">
          No app usage recorded yet.
        </p>
      ) : (
        <div className="space-y-4">
          {apps.map((app, index) => (
            <div key={app.name} className="group">

              <div className="mb-2 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
                    style={{
                      backgroundColor: `${app.color}20`,
                    }}
                  >
                    <span style={{ color: app.color }}>
                      {index + 1}
                    </span>
                  </span>

                  <span className="text-sm font-medium text-white">
                    {app.name}
                  </span>

                </div>

                <span className="text-sm font-medium text-slate-400">
                  {app.time}
                </span>

              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${app.percent}%`,
                    background: `linear-gradient(90deg, ${app.color}90, ${app.color})`,
                  }}
                />
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TopApps;