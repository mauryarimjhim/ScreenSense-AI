import { useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  Clock,
  TrendingUp,
  BarChart3,
  FileDown,
  CheckCircle2,
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
  weeklyReportsData,
  monthlyReportsData,
  reportChartData,
} from "../../data/reportsData";

const chartTooltipStyle = {
  background: "#0B1120",
  border: "1px solid #1E293B",
  borderRadius: "12px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
};

function Reports() {
  const [activeTab, setActiveTab] = useState("weekly");

  const reports = activeTab === "weekly" ? weeklyReportsData : monthlyReportsData;

  const handleExport = (format, reportTitle) => {
    // Simulated download
    const blob = new Blob(
      [`${reportTitle}\n\nExported as ${format.toUpperCase()}\n\nThis is a simulated export for demo purposes.`],
      { type: format === "pdf" ? "application/pdf" : "text/csv" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${reportTitle.replace(/\s+/g, "_")}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="page-header">
          <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Reports
          </h1>
          <p className="text-sm text-slate-400">
            Download and review your screen time reports.
          </p>
        </div>

        {/* Export All */}
        <div className="flex gap-2">
          <button
            onClick={() => handleExport("pdf", "Full_Report")}
            className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500 shadow-lg shadow-violet-500/20"
          >
            <FileDown size={16} />
            Export PDF
          </button>
          <button
            onClick={() => handleExport("csv", "Full_Report")}
            className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {["weekly", "monthly"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-5 py-2.5 text-sm font-medium capitalize transition-all ${
              activeTab === tab
                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20"
                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {tab} Reports
          </button>
        ))}
      </div>

      {/* Summary Chart */}
      <div className="glass-card p-5 sm:p-6">
        <h3 className="mb-5 text-base font-semibold text-white">
          {activeTab === "weekly" ? "Monthly" : "Quarterly"} Overview
        </h3>
        <div className="h-56 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reportChartData} margin={{ top: 5, right: 20, bottom: 0, left: -10 }}>
              <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="week" stroke="#475569" tick={{ fill: "#64748B", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#475569" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} labelStyle={{ color: "#F8FAFC", fontWeight: 600 }} itemStyle={{ color: "#94A3B8" }} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="screenTime" name="Screen Time (h)" fill="#8B5CF6" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="productivity" name="Productivity %" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Report Cards */}
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="glass-card glass-card-hover p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              {/* Left */}
              <div className="flex-1">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20">
                    <FileText className="text-violet-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{report.title}</h3>
                    <p className="text-xs text-slate-500">{report.period}</p>
                  </div>
                  <span className="ml-2 flex items-center gap-1 rounded-md bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                    <CheckCircle2 size={10} />
                    Ready
                  </span>
                </div>

                {/* Stats grid */}
                <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-lg bg-white/5 p-3">
                    <div className="mb-1 flex items-center gap-1.5">
                      <Clock size={12} className="text-slate-500" />
                      <span className="text-[10px] text-slate-500">Total</span>
                    </div>
                    <p className="text-sm font-bold text-white">{report.totalScreenTime}</p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-3">
                    <div className="mb-1 flex items-center gap-1.5">
                      <Calendar size={12} className="text-slate-500" />
                      <span className="text-[10px] text-slate-500">Daily Avg</span>
                    </div>
                    <p className="text-sm font-bold text-white">{report.avgDaily}</p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-3">
                    <div className="mb-1 flex items-center gap-1.5">
                      <TrendingUp size={12} className="text-slate-500" />
                      <span className="text-[10px] text-slate-500">Productivity</span>
                    </div>
                    <p className="text-sm font-bold text-white">{report.productivityScore}%</p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-3">
                    <div className="mb-1 flex items-center gap-1.5">
                      <BarChart3 size={12} className="text-slate-500" />
                      <span className="text-[10px] text-slate-500">Top App</span>
                    </div>
                    <p className="text-sm font-bold text-white truncate">{report.topApp}</p>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-1.5">
                  {report.highlights.map((h, i) => (
                    <p key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-violet-500" />
                      {h}
                    </p>
                  ))}
                </div>
              </div>

              {/* Right — Download buttons */}
              <div className="flex gap-2 lg:flex-col">
                <button
                  onClick={() => handleExport("pdf", report.title)}
                  className="flex items-center gap-2 rounded-lg bg-violet-600/20 px-4 py-2.5 text-xs font-medium text-violet-400 transition hover:bg-violet-600/30"
                >
                  <FileDown size={14} />
                  PDF
                </button>
                <button
                  onClick={() => handleExport("csv", report.title)}
                  className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2.5 text-xs font-medium text-slate-400 transition hover:bg-white/10"
                >
                  <Download size={14} />
                  CSV
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reports;
