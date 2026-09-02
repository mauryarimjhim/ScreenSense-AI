import { useEffect, useState } from "react";
import { dashboardApi } from "../../services/api";

import StatCard from "../../components/Dashboard/StatCard";
import WeeklyChart from "../../components/Dashboard/WeeklyChart";
import DailyUsageTrend from "../../components/Dashboard/DailyUsageTrend";
import TopApps from "../../components/Dashboard/TopApps";
import AIRecommendation from "../../components/Dashboard/AIRecommendation";
import GoalProgress from "../../components/Dashboard/GoalProgress";
import RecentActivity from "../../components/Dashboard/RecentActivity";

import {
  Smartphone,
  Target,
  BrainCircuit,
  LockKeyhole,
} from "lucide-react";

function formatMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}

function formatTrend(change) {
  if (change > 0) {
    return { trend: "up", trendValue: `+${change}%` };
  }

  if (change < 0) {
    return { trend: "down", trendValue: `${change}%` };
  }

  return { trend: "up", trendValue: "0%" };
}

function Overview() {
  const [productivity, setProductivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductivity = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No authentication token found");
          return;
        }

        const data = await dashboardApi.productivity(token);
        setProductivity(data.productivity);
      } catch (error) {
        console.error("Failed to fetch productivity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductivity();

    const interval = setInterval(fetchProductivity, 30000);

    return () => clearInterval(interval);
  }, []);

  const screenTimeTrend = formatTrend(productivity?.screenTimeChange || 0);
  const productivityTrend = formatTrend(productivity?.productivityChange || 0);
  const focusTrend = formatTrend(productivity?.focusChange || 0);

  return (
    <div className="dashboard-page">

      {/* Header */}
      <div className="page-header">
        <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          Good Evening, Rimjhim 👋
        </h1>

        <p className="text-sm text-slate-400 sm:text-base">
          Here's your digital wellbeing summary for today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-5">

        {/* Screen Time */}
        <StatCard
          title="Screen Time"
          value={
            loading
              ? "..."
              : formatMinutes(productivity?.totalScreenTime || 0)
          }
          icon={Smartphone}
          color="#8B5CF6"
          trend={screenTimeTrend.trend}
          trendValue={screenTimeTrend.trendValue}
        />

        {/* Productivity */}
        <StatCard
          title="Productivity"
          value={
            loading
              ? "..."
              : `${productivity?.score || 0}%`
          }
          icon={BrainCircuit}
          color="#10B981"
          trend={productivityTrend.trend}
          trendValue={productivityTrend.trendValue}
        />

        {/* Focus Score */}
        <StatCard
          title="Focus Score"
          value={
            loading
              ? "..."
              : `${productivity?.focusScore || 0}%`
          }
          icon={Target}
          color="#0EA5E9"
          trend={focusTrend.trend}
          trendValue={focusTrend.trendValue}
        />

        {/* Unlocks (activity sessions today) */}
        <StatCard
          title="Unlocks"
          value={
            loading
              ? "..."
              : `${productivity?.contextSwitches || 0}`
          }
          icon={LockKeyhole}
          color="#F59E0B"
          trend={screenTimeTrend.trend}
          trendValue={screenTimeTrend.trendValue}
        />

      </div>

      {/* Charts Row */}
      <div className="grid gap-5 lg:grid-cols-3">

        <div className="lg:col-span-2">
          <WeeklyChart />
        </div>

        <TopApps />

      </div>

      {/* Daily + AI Row */}
      <div className="grid gap-5 lg:grid-cols-2">

        <DailyUsageTrend />

        <AIRecommendation />

      </div>

      {/* Goal + Activity Row */}
      <div className="grid gap-5 lg:grid-cols-2">

        <GoalProgress />

        <RecentActivity />

      </div>

    </div>
  );
}

export default Overview;
