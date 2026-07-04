import { topAppsData } from "../../data/dashboardData";

function TopApps() {
  return (
    <div className="glass-card p-5 sm:p-6">
      <h2 className="mb-5 text-lg font-semibold text-white">
        Top Apps Today
      </h2>

      <div className="space-y-4">
        {topAppsData.map((app, index) => (
          <div key={app.name} className="group">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
                  style={{ backgroundColor: `${app.color}20` }}
                >
                  <span style={{ color: app.color }}>{index + 1}</span>
                </span>
                <span className="text-sm font-medium text-white">
                  {app.name}
                </span>
              </div>
              <span className="text-sm font-medium text-slate-400">
                {app.time}
              </span>
            </div>

            {/* Progress bar */}
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
    </div>
  );
}

export default TopApps;