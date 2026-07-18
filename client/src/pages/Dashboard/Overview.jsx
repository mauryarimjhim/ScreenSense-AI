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

function Overview() {
  return (
    <div className="dashboard-page space-y-8 sm:space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          Good Evening, Rimjhim 👋
        </h1>
        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Here's your digital wellbeing summary for today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-5">
        <StatCard
          title="Screen Time"
          value="5h 42m"
          icon={Smartphone}
          color="#8B5CF6"
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          title="Productivity"
          value="82%"
          icon={BrainCircuit}
          color="#10B981"
          trend="up"
          trendValue="+5%"
        />
        <StatCard
          title="Focus Score"
          value="78%"
          icon={Target}
          color="#0EA5E9"
          trend="down"
          trendValue="-3%"
        />
        <StatCard
          title="Unlocks"
          value="146"
          icon={LockKeyhole}
          color="#F59E0B"
          trend="up"
          trendValue="+8%"
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
