import { TrendingUp, TrendingDown } from "lucide-react";

function AppCard({ app, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full rounded-2xl border p-5 text-left transition-all duration-300 ${
        isSelected
          ? "border-violet-500/50 bg-violet-500/10 shadow-lg shadow-violet-500/10"
          : "border-slate-800/60 bg-[#101827]/80 hover:border-slate-700 hover:bg-[#172036]"
      }`}
    >
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute -right-px -top-px h-4 w-4 rounded-bl-xl rounded-tr-2xl bg-violet-500" />
      )}

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
            style={{ backgroundColor: `${app.color}15` }}
          >
            {app.icon}
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">
              {app.name}
            </h3>
            <p className="mt-0.5 text-sm text-slate-400">
              {app.totalUsage}
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium ${
          app.trendDirection === "up"
            ? "bg-emerald-500/10 text-emerald-400"
            : "bg-red-500/10 text-red-400"
        }`}>
          {app.trendDirection === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {app.trend}
        </div>
      </div>

      {/* Mini stats */}
      <div className="mt-4 flex gap-4 text-xs text-slate-500">
        <span>Peak: {app.peakTime}</span>
        <span>•</span>
        <span>{app.sessionsToday} sessions</span>
      </div>
    </button>
  );
}

export default AppCard;