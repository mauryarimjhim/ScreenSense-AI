import { useEffect, useState } from "react";
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
import { analyticsApi } from "../../services/api";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDayLabel(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return DAY_LABELS[date.getDay()];
}

function WeeklyChart() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const data = await analyticsApi.weekly(token);
        const days = data.days || [];

        const formatted = days.map((day) => ({
          day: getDayLabel(day.date),
          hours: Math.round((day.totalScreenTime / 60) * 10) / 10,
          goal: 4.5,
        }));

        setChartData(formatted);
      } catch (error) {
        console.error("Failed to fetch weekly chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyData();

    const interval = setInterval(fetchWeeklyData, 30000);

    return () => clearInterval(interval);
  }, []);

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
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-slate-400">Loading chart...</p>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-slate-400">
              No usage data for this week yet.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: -15 }}>
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
        )}
      </div>
    </div>
  );
}

export default WeeklyChart;
