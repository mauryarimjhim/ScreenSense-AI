import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { weeklyScreenTimeData } from "../../data/dashboardData";

function WeeklyChart() {
  return (
    <div className="glass-card p-5 sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Weekly Screen Time
          </h2>
          <p className="mt-1 text-sm text-slate-500">Hours per day this week</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-violet-500" />
            Actual
          </span>
          <span className="flex items-center gap-1.5 text-slate-500">
            <span className="h-2 w-2 rounded-full bg-slate-600" />
            Goal
          </span>
        </div>
      </div>

      <div className="h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weeklyScreenTimeData} margin={{ top: 5, right: 5, bottom: 0, left: -15 }}>
            <defs>
              <linearGradient id="weeklyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="#475569"
              tick={{ fill: "#64748B", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="#475569"
              tick={{ fill: "#64748B", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              unit="h"
            />
            <Tooltip
              contentStyle={{
                background: "#0B1120",
                border: "1px solid #1E293B",
                borderRadius: "12px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
              labelStyle={{ color: "#F8FAFC", fontWeight: 600 }}
              itemStyle={{ color: "#94A3B8" }}
            />
            <ReferenceLine y={4.5} stroke="#475569" strokeDasharray="6 4" label="" />
            <Area
              type="monotone"
              dataKey="hours"
              stroke="#8B5CF6"
              strokeWidth={2.5}
              fill="url(#weeklyGrad)"
              dot={{ fill: "#8B5CF6", strokeWidth: 0, r: 4 }}
              activeDot={{ fill: "#A78BFA", stroke: "#8B5CF6", strokeWidth: 2, r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WeeklyChart;