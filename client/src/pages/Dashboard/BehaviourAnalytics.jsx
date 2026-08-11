import {
  Unlock,
  Bell,
  Clock,
  Brain,
  ArrowLeftRight,
  Flame,
  BarChart3,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  unlockTimelineData,
  notificationData,
  peakUsageData,
  focusSessionsData,
  appSwitchData,
  heatmapData,
  weeklyBehaviourData,
} from "../../data/behaviourData";

/* ── Stat card helper ── */
function BehaviourStat({ icon: Icon, label, value, color }) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}20` }}>
          <Icon size={20} style={{ color }} />
        </div>
        <div>
          <p className="text-xs text-slate-500">{label}</p>
          <p className="text-xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Tooltip helper ── */
const chartTooltipStyle = {
  background: "#0B1120",
  border: "1px solid #1E293B",
  borderRadius: "12px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
};

function BehaviourAnalytics() {
  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="page-header">
        <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          Behaviour Analytics
        </h1>
        <p className="text-sm text-slate-400">
          Understand your digital habits and patterns.
        </p>
      </div>

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <BehaviourStat icon={Unlock} label="Total Unlocks" value="146" color="#F59E0B" />
        <BehaviourStat icon={Bell} label="Notifications" value="209" color="#EF4444" />
        <BehaviourStat icon={ArrowLeftRight} label="App Switches" value="95" color="#0EA5E9" />
        <BehaviourStat icon={Brain} label="Focus Score" value="78%" color="#8B5CF6" />
      </div>

      {/* Unlock Timeline + Notifications */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Unlock timeline */}
        <div className="glass-card p-5 sm:p-6">
          <h3 className="mb-5 text-base font-semibold text-white">Screen Unlock Timeline</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={unlockTimelineData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="unlockGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" stroke="#475569" tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} interval={2} />
                <YAxis stroke="#475569" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} labelStyle={{ color: "#F8FAFC", fontWeight: 600 }} itemStyle={{ color: "#94A3B8" }} />
                <Bar dataKey="unlocks" fill="url(#unlockGrad)" radius={[4, 4, 0, 0]} maxBarSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Notification stats */}
        <div className="glass-card p-5 sm:p-6">
          <h3 className="mb-5 text-base font-semibold text-white">Notification Count</h3>
          <div className="space-y-3">
            {notificationData.map((item) => (
              <div key={item.app} className="flex items-center gap-3">
                <span className="w-20 text-sm text-slate-400">{item.app}</span>
                <div className="flex-1">
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${(item.count / 84) * 100}%`,
                        background: item.color,
                      }}
                    />
                  </div>
                </div>
                <span className="w-8 text-right text-sm font-semibold text-white">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Peak Usage + Focus Sessions */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Peak usage */}
        <div className="glass-card p-5 sm:p-6">
          <h3 className="mb-5 text-base font-semibold text-white">Peak Usage Hours</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={peakUsageData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="peakGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hour" stroke="#475569" tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
                <YAxis stroke="#475569" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} labelStyle={{ color: "#F8FAFC", fontWeight: 600 }} itemStyle={{ color: "#94A3B8" }} />
                <Area type="monotone" dataKey="value" stroke="#EF4444" strokeWidth={2} fill="url(#peakGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Focus sessions */}
        <div className="glass-card p-5 sm:p-6">
          <h3 className="mb-5 text-base font-semibold text-white">Focus Sessions</h3>
          <div className="space-y-3">
            {focusSessionsData.map((session) => (
              <div key={session.id} className="flex items-center gap-4 rounded-xl bg-white/5 p-4 transition hover:bg-white/8">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  session.status === "completed" ? "bg-emerald-500/20" : "bg-amber-500/20"
                }`}>
                  <Brain size={18} className={session.status === "completed" ? "text-emerald-400" : "text-amber-400"} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white">{session.title}</p>
                  <p className="text-xs text-slate-500">{session.time} · {session.duration}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{session.score}</p>
                  <p className="text-xs text-slate-500">score</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* App Switching + Heatmap */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* App switching */}
        <div className="glass-card p-5 sm:p-6">
          <h3 className="mb-5 text-base font-semibold text-white">App Switching Frequency</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={appSwitchData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" stroke="#475569" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#475569" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} labelStyle={{ color: "#F8FAFC", fontWeight: 600 }} itemStyle={{ color: "#94A3B8" }} />
                <Line type="monotone" dataKey="switches" stroke="#0EA5E9" strokeWidth={2.5} dot={{ fill: "#0EA5E9", r: 3 }} activeDot={{ r: 6, stroke: "#0EA5E9", strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Usage Heatmap */}
        <div className="glass-card p-5 sm:p-6">
          <h3 className="mb-5 text-base font-semibold text-white">Screen Time Heatmap</h3>
          <div className="overflow-x-auto">
            <div className="min-w-[500px]">
              {/* Hour labels */}
              <div className="mb-1 flex">
                <span className="w-10" />
                {[...Array(24)].map((_, i) => (
                  <span key={i} className="flex-1 text-center text-[8px] text-slate-600">
                    {i % 4 === 0 ? `${i}` : ""}
                  </span>
                ))}
              </div>

              {heatmapData.map((row) => (
                <div key={row.day} className="mb-1 flex items-center">
                  <span className="w-10 text-xs text-slate-500">{row.day}</span>
                  <div className="flex flex-1 gap-0.5">
                    {row.hours.map((val, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: "18px",
                          backgroundColor: val === 0
                            ? "#1E293B"
                            : `rgba(139, 92, 246, ${Math.min(val / 100, 1)})`,
                        }}
                        title={`${row.day} ${i}:00 — ${val}%`}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {/* Legend */}
              <div className="mt-3 flex items-center justify-end gap-2 text-xs text-slate-500">
                <span>Less</span>
                {[0.1, 0.3, 0.5, 0.7, 0.9].map((opacity) => (
                  <div
                    key={opacity}
                    className="h-3 w-3 rounded-sm"
                    style={{ backgroundColor: `rgba(139, 92, 246, ${opacity})` }}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Behaviour Chart */}
      <div className="glass-card p-5 sm:p-6">
        <h3 className="mb-5 text-base font-semibold text-white">Weekly Behaviour Trends</h3>
        <div className="h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyBehaviourData} margin={{ top: 5, right: 20, bottom: 0, left: -10 }}>
              <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" stroke="#475569" tick={{ fill: "#64748B", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#475569" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} labelStyle={{ color: "#F8FAFC", fontWeight: 600 }} itemStyle={{ color: "#94A3B8" }} />
              <Legend wrapperStyle={{ fontSize: "12px", color: "#94A3B8" }} />
              <Line type="monotone" dataKey="screenTime" name="Screen Time (h)" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="focusScore" name="Focus Score" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default BehaviourAnalytics;
