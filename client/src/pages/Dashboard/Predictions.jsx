import {
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
  Shield,
  BarChart3,
  Target,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  tomorrowPrediction,
  weeklyForecast,
  monthlyForecast,
  productivityPrediction,
  riskScoreData,
  forecastComparisonData,
} from "../../data/predictionsData";

const chartTooltipStyle = {
  background: "#0B1120",
  border: "1px solid #1E293B",
  borderRadius: "12px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
};

function Predictions() {
  return (
    <div className="dashboard-page space-y-8 sm:space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          Predictions
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          AI-powered forecasts for your digital habits.
        </p>
      </div>

      {/* Tomorrow's Prediction */}
      <div className="glass-card glow-border p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20">
            <Zap className="text-violet-400" size={22} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Tomorrow's Prediction</h2>
            <p className="text-xs text-slate-500">Based on your behavioural patterns</p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-violet-500/10 p-4 text-center">
            <p className="text-xs text-slate-400">Predicted Screen Time</p>
            <p className="mt-2 text-3xl font-bold text-white">{tomorrowPrediction.screenTime}</p>
            <p className="mt-1 text-xs text-emerald-400">{tomorrowPrediction.comparison}</p>
          </div>

          {tomorrowPrediction.breakdown.slice(0, 3).map((item) => (
            <div key={item.app} className="rounded-xl bg-white/5 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-white">{item.app}</span>
                <span className={`text-xs font-medium ${
                  item.change.startsWith("-") ? "text-emerald-400" : "text-amber-400"
                }`}>{item.change}</span>
              </div>
              <p className="text-lg font-bold text-white">{item.predicted}</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full" style={{ width: "60%", backgroundColor: item.color }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2">
          <Shield size={14} className="text-violet-400" />
          <span className="text-xs text-slate-400">
            Confidence: <span className="font-semibold text-white">{tomorrowPrediction.confidence}%</span>
          </span>
        </div>
      </div>

      {/* Weekly + Monthly Forecast */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Weekly */}
        <div className="glass-card p-5 sm:p-6">
          <h3 className="mb-5 text-base font-semibold text-white">Weekly Forecast</h3>
          <div className="h-56 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyForecast} margin={{ top: 5, right: 5, bottom: 0, left: -15 }}>
                <defs>
                  <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" stroke="#475569" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#475569" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} unit="h" />
                <Tooltip contentStyle={chartTooltipStyle} labelStyle={{ color: "#F8FAFC", fontWeight: 600 }} itemStyle={{ color: "#94A3B8" }} />
                <Area type="monotone" dataKey="upper" stroke="none" fill="#8B5CF620" />
                <Area type="monotone" dataKey="lower" stroke="none" fill="#060B17" />
                <Line type="monotone" dataKey="predicted" stroke="#8B5CF6" strokeWidth={2.5} dot={{ fill: "#8B5CF6", r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly */}
        <div className="glass-card p-5 sm:p-6">
          <h3 className="mb-5 text-base font-semibold text-white">Monthly Forecast</h3>
          <div className="h-56 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyForecast} margin={{ top: 5, right: 5, bottom: 0, left: -15 }}>
                <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" stroke="#475569" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#475569" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} unit="h" />
                <Tooltip contentStyle={chartTooltipStyle} labelStyle={{ color: "#F8FAFC", fontWeight: 600 }} itemStyle={{ color: "#94A3B8" }} />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Bar dataKey="predicted" name="Predicted" fill="#8B5CF6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="actual" name="Actual" fill="#0EA5E9" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Productivity Prediction + Risk Score */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Productivity */}
        <div className="glass-card p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
                <Target className="text-emerald-400" size={20} />
              </div>
              <h3 className="text-base font-semibold text-white">Productivity Prediction</h3>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-emerald-400">{productivityPrediction.tomorrowScore}%</p>
              <p className="text-xs text-slate-500">Tomorrow</p>
            </div>
          </div>

          <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2">
            <TrendingUp size={14} className="text-emerald-400" />
            <span className="text-xs text-emerald-300">
              Trend is {productivityPrediction.trend} — weekly avg: {productivityPrediction.weekAvg}%
            </span>
          </div>

          <div className="space-y-2">
            {productivityPrediction.factors.map((factor, i) => (
              <div key={i} className={`flex items-start gap-3 rounded-lg p-3 ${
                factor.type === "positive" ? "bg-emerald-500/10" : "bg-red-500/10"
              }`}>
                {factor.type === "positive" ? (
                  <CheckCircle2 size={14} className="mt-0.5 text-emerald-400" />
                ) : (
                  <AlertTriangle size={14} className="mt-0.5 text-red-400" />
                )}
                <div className="flex-1">
                  <p className="text-xs text-slate-300">{factor.factor}</p>
                </div>
                <span className={`text-xs font-semibold ${
                  factor.type === "positive" ? "text-emerald-400" : "text-red-400"
                }`}>{factor.impact}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Score */}
        <div className="glass-card p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20">
              <Shield className="text-amber-400" size={20} />
            </div>
            <h3 className="text-base font-semibold text-white">Risk Assessment</h3>
          </div>

          {/* Risk gauge */}
          <div className="mb-5 flex items-center justify-center">
            <div className="relative h-32 w-32">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#1E293B" strokeWidth="6" />
                <circle
                  cx="50" cy="50" r="42"
                  fill="none" stroke={riskScoreData.color} strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${riskScoreData.score * 2.64} 264`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold" style={{ color: riskScoreData.color }}>{riskScoreData.score}</span>
                <span className="text-xs text-slate-400">{riskScoreData.level} Risk</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {riskScoreData.factors.map((factor) => (
              <div key={factor.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-slate-400">{factor.name}</span>
                  <span className="font-semibold" style={{ color: factor.color }}>{factor.value}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full rounded-full" style={{ width: `${factor.value}%`, backgroundColor: factor.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Forecast Comparison */}
      <div className="glass-card p-5 sm:p-6">
        <h3 className="mb-5 text-base font-semibold text-white">Forecast Accuracy — Last Week</h3>
        <div className="h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastComparisonData} margin={{ top: 5, right: 20, bottom: 0, left: -10 }}>
              <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" stroke="#475569" tick={{ fill: "#64748B", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#475569" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} unit="h" />
              <Tooltip contentStyle={chartTooltipStyle} labelStyle={{ color: "#F8FAFC", fontWeight: 600 }} itemStyle={{ color: "#94A3B8" }} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line type="monotone" dataKey="predicted" name="Predicted" stroke="#8B5CF6" strokeWidth={2} strokeDasharray="6 3" dot={{ r: 3, fill: "#8B5CF6" }} />
              <Line type="monotone" dataKey="actual" name="Actual" stroke="#0EA5E9" strokeWidth={2.5} dot={{ r: 4, fill: "#0EA5E9" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Predictions;
