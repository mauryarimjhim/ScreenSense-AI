import { recentActivitiesData } from "../../data/dashboardData";
import {
  Smartphone,
  Target,
  BrainCircuit,
  Unlock,
  Trophy,
} from "lucide-react";

const iconMap = {
  app_open: Smartphone,
  goal: Target,
  insight: BrainCircuit,
  unlock: Unlock,
  achievement: Trophy,
};

function RecentActivity() {
  return (
    <div className="glass-card p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
        <button className="text-xs font-medium text-violet-400 transition hover:text-violet-300">
          View all
        </button>
      </div>

      <div className="space-y-1">
        {recentActivitiesData.map((activity, index) => {
          const Icon = iconMap[activity.type] || Smartphone;
          return (
            <div
              key={activity.id}
              className="group flex items-start gap-4 rounded-xl px-3 py-3 transition hover:bg-white/5"
            >
              {/* Timeline connector */}
              <div className="relative flex flex-col items-center">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${activity.color}15` }}
                >
                  <Icon size={16} style={{ color: activity.color }} />
                </div>
                {index < recentActivitiesData.length - 1 && (
                  <div className="mt-1 h-6 w-px bg-slate-800" />
                )}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">
                  {activity.title}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {activity.description}
                </p>
              </div>

              {/* Time */}
              <span className="shrink-0 text-xs text-slate-600">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentActivity;
