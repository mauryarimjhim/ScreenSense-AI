import {
  BrainCircuit,
  Sparkles,
  Moon,
  Target,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Clock,
  Flame,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  weeklySummary,
  productivityData,
  sleepImpactData,
  focusScoreData,
  recommendationsData,
  dailyTipsData,
  habitAnalysisData,
  addictiveAppData,
} from "../../data/aiInsightsData";
import { useState } from "react";

const chartTooltipStyle = {
  background: "#0B1120",
  border: "1px solid #1E293B",
  borderRadius: "12px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
};

function AIInsights() {
  const [activeTip, setActiveTip] = useState(0);

  return (
    <div className="dashboard-page space-y-8 sm:space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          AI Insights
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Personalized analysis powered by machine learning.
        </p>
      </div>

      {/* Weekly Summary */}
      <div className="glass-card glow-border p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20">
            <Sparkles className="text-violet-400" size={22} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">{weeklySummary.title}</h2>
            <p className="text-xs text-slate-500">{weeklySummary.period}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-2xl font-bold text-white">{weeklySummary.overallScore}</span>
            <span className="text-xs text-slate-500">/100</span>
          </div>
        </div>

        <div className="space-y-2">
          {weeklySummary.highlights.map((item, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 rounded-lg p-3 ${
                item.type === "positive" ? "bg-emerald-500/10" :
                item.type === "warning" ? "bg-amber-500/10" :
                "bg-red-500/10"
              }`}
            >
              {item.type === "positive" ? (
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-400" />
              ) : item.type === "warning" ? (
                <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-400" />
              ) : (
                <AlertTriangle size={16} className="mt-0.5 shrink-0 text-red-400" />
              )}
              <p className="text-sm text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Productivity + Sleep */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Productivity */}
        <div className="glass-card p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
                <TrendingUp className="text-emerald-400" size={20} />
              </div>
              <h3 className="text-base font-semibold text-white">Productivity Analysis</h3>
            </div>
            <span className="text-2xl font-bold text-emerald-400">{productivityData.score}%</span>
          </div>

          {/* Breakdown */}
          <div className="mb-5 space-y-3">
            {productivityData.breakdown.map((item) => (
              <div key={item.category}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-slate-400">{item.category}</span>
                  <span className="text-white">{item.hours}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full rounded-full" style={{ width: `${item.percent}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productivityData.weeklyTrend} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" stroke="#475569" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#475569" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} labelStyle={{ color: "#F8FAFC", fontWeight: 600 }} itemStyle={{ color: "#94A3B8" }} />
                <Bar dataKey="productive" name="Productive" fill="#10B981" radius={[3, 3, 0, 0]} stackId="stack" maxBarSize={24} />
                <Bar dataKey="unproductive" name="Unproductive" fill="#EF4444" radius={[3, 3, 0, 0]} stackId="stack" maxBarSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sleep Impact */}
        <div className="glass-card p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20">
                <Moon className="text-indigo-400" size={20} />
              </div>
              <h3 className="text-base font-semibold text-white">Sleep Impact</h3>
            </div>
            <span className="text-2xl font-bold text-indigo-400">{sleepImpactData.impactScore}/100</span>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/5 p-3">
              <p className="text-xs text-slate-500">Avg Bedtime</p>
              <p className="mt-1 text-lg font-bold text-white">{sleepImpactData.avgBedtime}</p>
            </div>
            <div className="rounded-xl bg-white/5 p-3">
              <p className="text-xs text-slate-500">Last Screen Use</p>
              <p className="mt-1 text-lg font-bold text-white">{sleepImpactData.avgLastUsage}</p>
            </div>
          </div>

          <div className="space-y-2">
            {sleepImpactData.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg bg-indigo-500/10 p-3">
                <Moon size={14} className="mt-0.5 shrink-0 text-indigo-400" />
                <p className="text-xs text-indigo-300">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Focus Score + Recommendations */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Focus Score */}
        <div className="glass-card p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20">
              <Target className="text-cyan-400" size={20} />
            </div>
            <h3 className="text-base font-semibold text-white">Focus Score</h3>
          </div>

          {/* Circular score */}
          <div className="mb-5 flex items-center justify-center">
            <div className="relative h-32 w-32">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#1E293B" strokeWidth="6" />
                <circle
                  cx="50" cy="50" r="42"
                  fill="none" stroke="#0EA5E9" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${focusScoreData.current * 2.64} 264`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{focusScoreData.current}</span>
                <span className="text-xs text-emerald-400">{focusScoreData.trend} pts</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {focusScoreData.breakdown.map((item) => (
              <div key={item.metric}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-slate-400">{item.metric}</span>
                  <span className="font-semibold text-white">{item.score}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full rounded-full" style={{ width: `${item.score}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="glass-card p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20">
              <Lightbulb className="text-amber-400" size={20} />
            </div>
            <h3 className="text-base font-semibold text-white">Personalized Recommendations</h3>
          </div>

          <div className="space-y-3">
            {recommendationsData.map((rec) => (
              <div key={rec.id} className="rounded-xl border border-slate-800/60 bg-white/5 p-4 transition hover:bg-white/8">
                <div className="mb-2 flex items-start gap-3">
                  <span className="text-xl">{rec.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white">{rec.title}</h4>
                      <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase ${
                        rec.priority === "high" ? "bg-red-500/20 text-red-400" :
                        rec.priority === "medium" ? "bg-amber-500/20 text-amber-400" :
                        "bg-emerald-500/20 text-emerald-400"
                      }`}>
                        {rec.priority}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{rec.description}</p>
                    <p className="mt-2 text-xs font-medium text-violet-400">↗ {rec.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Tips + Habit Analysis + Addictive App */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Daily Tips */}
        <div className="glass-card p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20">
              <Zap className="text-violet-400" size={20} />
            </div>
            <h3 className="text-base font-semibold text-white">Daily Tips</h3>
          </div>

          <div className="rounded-xl bg-violet-500/10 p-4">
            <p className="text-sm leading-relaxed text-violet-200">
              {dailyTipsData[activeTip]}
            </p>
          </div>

          <div className="mt-3 flex justify-center gap-2">
            {dailyTipsData.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTip(i)}
                className={`h-2 rounded-full transition-all ${
                  activeTip === i ? "w-6 bg-violet-500" : "w-2 bg-slate-700 hover:bg-slate-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Habit Analysis */}
        <div className="glass-card p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
              <Clock className="text-emerald-400" size={20} />
            </div>
            <h3 className="text-base font-semibold text-white">Habit Patterns</h3>
          </div>

          <div className="space-y-3">
            {habitAnalysisData.patterns.map((habit, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2.5">
                <span className="text-lg">{habit.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-white">{habit.habit}</p>
                  <p className="text-xs text-slate-500">
                    {habit.time || habit.duration}
                    {habit.app && ` · ${habit.app}`}
                  </p>
                </div>
                {habit.trend && (
                  <span className={`text-[10px] font-medium ${
                    habit.trend === "increasing" || habit.trend === "late" ? "text-amber-400" : "text-emerald-400"
                  }`}>
                    {habit.trend}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Most Addictive App */}
        <div className="glass-card p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20">
              <Flame className="text-red-400" size={20} />
            </div>
            <h3 className="text-base font-semibold text-white">Most Addictive</h3>
          </div>

          <div className="mb-4 flex items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
              style={{ backgroundColor: `${addictiveAppData.color}15` }}
            >
              {addictiveAppData.icon}
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">{addictiveAppData.name}</h4>
              <p className="text-sm text-slate-400">Addiction Score: <span className="font-semibold text-red-400">{addictiveAppData.addictionScore}/100</span></p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between rounded-lg bg-white/5 px-3 py-2 text-xs">
              <span className="text-slate-400">Daily Average</span>
              <span className="font-semibold text-white">{addictiveAppData.dailyAvg}</span>
            </div>
            <div className="flex justify-between rounded-lg bg-white/5 px-3 py-2 text-xs">
              <span className="text-slate-400">Weekly Change</span>
              <span className="font-semibold text-red-400">{addictiveAppData.weeklyIncrease}</span>
            </div>
            <div className="flex justify-between rounded-lg bg-white/5 px-3 py-2 text-xs">
              <span className="text-slate-400">Peak Usage</span>
              <span className="font-semibold text-white">{addictiveAppData.peakUsage} ({addictiveAppData.peakDay})</span>
            </div>
            <div className="flex justify-between rounded-lg bg-white/5 px-3 py-2 text-xs">
              <span className="text-slate-400">Main Feature</span>
              <span className="font-semibold text-white">{addictiveAppData.mainFeature}</span>
            </div>
          </div>

          {/* Addiction meter */}
          <div className="mt-4">
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-red-500"
                style={{ width: `${addictiveAppData.addictionScore}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIInsights;
