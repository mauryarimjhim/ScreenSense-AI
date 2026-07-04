import { goalProgressData } from "../../data/dashboardData";
import { Target, Flame } from "lucide-react";

function GoalProgress() {
  const { current, goal, percentage } = goalProgressData;

  return (
    <div className="glass-card p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
            <Target className="text-emerald-400" size={22} />
          </div>
          <h2 className="text-lg font-semibold text-white">Daily Goal</h2>
        </div>

        <div className="flex items-center gap-1.5 rounded-lg bg-orange-500/10 px-3 py-1">
          <Flame className="text-orange-400" size={14} />
          <span className="text-xs font-semibold text-orange-400">7 day streak</span>
        </div>
      </div>

      <p className="text-sm text-slate-400">
        Today's Screen Time Limit
      </p>

      {/* Circular progress */}
      <div className="mt-5 flex items-center gap-6">
        <div className="relative h-24 w-24 shrink-0">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#1E293B" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="url(#goalGrad)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 2.64} 264`}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="goalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#6D28D9" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-white">{percentage}%</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white">{current}h 00m</span>
            <span className="text-sm text-slate-500">/ {goal}h goal</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-1000 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-xs text-emerald-400">
            ✓ On track — 1h remaining
          </p>
        </div>
      </div>
    </div>
  );
}

export default GoalProgress;