import { useEffect, useState } from "react";
import { dashboardApi } from "../../services/api";
import {
  Smartphone,
  BrainCircuit,
  Music,
  MessageCircle,
  Briefcase,
  Video,
} from "lucide-react";

const iconMap = {
  videos: Video,
  shorts: Video,
  reels: Video,
  posts: Smartphone,
  stories: Smartphone,
  explore: Smartphone,
  chats: MessageCircle,
  jobs: Briefcase,
  feed: Smartphone,
  music: Music,
};

function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const data = await dashboardApi.activityAnalytics(token);

        const activityData = data.activities || [];

        const formatted = activityData
          .slice(0, 5)
          .map((activity, index) => {
            const minutes = Math.max(
              1,
              Math.round(activity.totalTime / 60)
            );

            return {
              id: `${activity.activityName}-${index}`,
              title: activity.activityName,
              description: `${minutes} min tracked today`,
              time: `${minutes} min`,
            };
          });

        setActivities(formatted);
      } catch (error) {
        console.error(
          "Failed to fetch activity analytics:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();

    const interval = setInterval(fetchActivities, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Recent Activity
        </h2>

        <button className="text-xs font-medium text-violet-400 transition hover:text-violet-300">
          View all
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-400">
          Loading activities...
        </p>
      ) : activities.length === 0 ? (
        <p className="text-sm text-slate-400">
          No activity recorded yet.
        </p>
      ) : (
        <div className="space-y-1">
          {activities.map((activity, index) => {
            const Icon =
              iconMap[activity.title] || BrainCircuit;

            return (
              <div
                key={activity.id}
                className="group flex items-start gap-4 rounded-xl px-3 py-3 transition hover:bg-white/5"
              >
                <div className="relative flex flex-col items-center">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                    <Icon
                      size={16}
                      className="text-violet-400"
                    />
                  </div>

                  {index < activities.length - 1 && (
                    <div className="mt-1 h-6 w-px bg-slate-800" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium capitalize text-white">
                    {activity.title}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {activity.description}
                  </p>
                </div>

                <span className="shrink-0 text-xs text-slate-600">
                  {activity.time}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RecentActivity;