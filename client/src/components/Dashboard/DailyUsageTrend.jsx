import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { analyticsApi } from "../../services/api";

function DailyUsageTrend() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDailyData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const data = await analyticsApi.daily(token);
        const hourlyUsage = data.analytics?.hourlyUsage || [];

        setChartData(hourlyUsage);
      } catch (error) {
        console.error("Failed to fetch daily usage trend:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyData();

    const interval = setInterval(fetchDailyData, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card p-5 sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Today's Usage Pattern
          </h2>
          <p className="mt-1 text-sm text-slate-500">Minutes per hour</p>
        </div>
        <span className="rounded-lg bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400">
          Live
        </span>
      </div>

      <div className="h-56 sm:h-64">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-slate-400">Loading chart...</p>
          </div>
        ) : chartData.every((entry) => entry.minutes === 0) ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-slate-400">
              No usage recorded today yet.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#6D28D9" />
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
                cursor={{ fill: "rgba(139, 92, 246, 0.05)" }}
              />
              <Bar
                dataKey="minutes"
                fill="url(#barGrad)"
                radius={[4, 4, 0, 0]}
                maxBarSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default DailyUsageTrend;
