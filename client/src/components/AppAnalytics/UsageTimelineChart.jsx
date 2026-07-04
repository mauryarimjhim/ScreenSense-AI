import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function UsageTimelineChart({ data, color }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="glass-card p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">Hourly Usage</h3>
        <span className="text-xs text-slate-500">Today</span>
      </div>

      <div className="h-52 sm:h-60">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id={`areaGrad-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="hour"
              stroke="#475569"
              tick={{ fill: "#64748B", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              interval={2}
            />
            <YAxis
              stroke="#475569"
              tick={{ fill: "#64748B", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              unit="m"
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
            <Area
              type="monotone"
              dataKey="min"
              stroke={color}
              strokeWidth={2}
              fill={`url(#areaGrad-${color})`}
              dot={false}
              activeDot={{ fill: color, stroke: "#0B1120", strokeWidth: 2, r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default UsageTimelineChart;
