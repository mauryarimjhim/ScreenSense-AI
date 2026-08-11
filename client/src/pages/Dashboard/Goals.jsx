import { useState } from "react";
import {
  Target,
  Flame,
  Trophy,
  Lock,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";
import {
  dailyGoals,
  weeklyGoals,
  monthlyGoals,
  achievementsData,
  streakData,
} from "../../data/goalsData";

const goalTabs = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
];

const goalsMap = {
  daily: dailyGoals,
  weekly: weeklyGoals,
  monthly: monthlyGoals,
};

const statusColors = {
  "completed": "text-emerald-400 bg-emerald-500/20",
  "on-track": "text-sky-400 bg-sky-500/20",
  "in-progress": "text-amber-400 bg-amber-500/20",
  "close": "text-violet-400 bg-violet-500/20",
};

function Goals() {
  const [activeTab, setActiveTab] = useState("daily");
  const goals = goalsMap[activeTab];

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="page-header">
        <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          Goals
        </h1>
        <p className="text-sm text-slate-400">
          Set targets, track progress, and earn achievements.
        </p>
      </div>

      {/* Streak + Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Current Streak */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20">
              <Flame className="text-orange-400" size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500">Current Streak</p>
              <p className="text-2xl font-bold text-white">{streakData.current} days</p>
            </div>
          </div>
        </div>

        {/* Longest Streak */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20">
              <Trophy className="text-violet-400" size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500">Longest Streak</p>
              <p className="text-2xl font-bold text-white">{streakData.longest} days</p>
            </div>
          </div>
        </div>

        {/* Badges earned */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
              <CheckCircle2 className="text-emerald-400" size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500">Badges Earned</p>
              <p className="text-2xl font-bold text-white">
                {achievementsData.filter(a => a.earned).length}/{achievementsData.length}
              </p>
            </div>
          </div>
        </div>

        {/* This Week */}
        <div className="glass-card p-5">
          <p className="mb-3 text-xs text-slate-500">This Week</p>
          <div className="flex gap-2">
            {streakData.weekDays.map((day, i) => (
              <div key={day} className="flex flex-1 flex-col items-center gap-1.5">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                  streakData.thisWeek[i]
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-slate-800 text-slate-600"
                }`}>
                  {streakData.thisWeek[i] ? "✓" : "·"}
                </div>
                <span className="text-[10px] text-slate-600">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goal Tabs + Goals */}
      <div>
        <div className="mb-5 flex gap-2">
          {goalTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20"
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Goal cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {goals.map((goal) => (
            <div key={goal.id} className="glass-card glass-card-hover p-5">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/20">
                    <Target className="text-violet-400" size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-white">{goal.title}</h4>
                  </div>
                </div>
                <span className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold capitalize ${
                  statusColors[goal.status] || "text-slate-400 bg-slate-800"
                }`}>
                  {goal.status}
                </span>
              </div>

              <div className="mb-2 flex items-baseline justify-between">
                <span className="text-lg font-bold text-white">{goal.current}</span>
                <span className="text-xs text-slate-500">Target: {goal.target}</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${Math.min(goal.percent, 100)}%`,
                    background: goal.percent >= 100
                      ? "linear-gradient(90deg, #10B981, #059669)"
                      : goal.percent >= 70
                      ? "linear-gradient(90deg, #8B5CF6, #7C3AED)"
                      : "linear-gradient(90deg, #F59E0B, #D97706)",
                  }}
                />
              </div>
              <p className="mt-1.5 text-right text-xs text-slate-500">{goal.percent}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Badges */}
      <div>
        <h2 className="mb-5 text-lg font-semibold text-white">Achievement Badges</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {achievementsData.map((badge) => (
            <div
              key={badge.id}
              className={`glass-card p-5 text-center transition ${
                badge.earned ? "glow-border" : "opacity-60"
              }`}
            >
              <div className="mx-auto mb-3 text-4xl">
                {badge.earned ? badge.icon : (
                  <div className="relative inline-block">
                    <span className="opacity-40">{badge.icon}</span>
                    <Lock size={16} className="absolute -right-1 -top-1 text-slate-500" />
                  </div>
                )}
              </div>
              <h4 className="text-sm font-semibold text-white">{badge.title}</h4>
              <p className="mt-1 text-xs text-slate-500">{badge.description}</p>

              {badge.earned ? (
                <p className="mt-3 text-[10px] font-medium text-emerald-400">
                  ✓ Earned {badge.date}
                </p>
              ) : (
                <div className="mt-3">
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-slate-600"
                      style={{ width: `${badge.progress || 0}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[10px] text-slate-600">{badge.progress || 0}% complete</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Goals;
