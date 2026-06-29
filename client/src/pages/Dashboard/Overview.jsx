import DashboardLayout from "../../components/Dashboard/DashboardLayout";

function Overview() {
  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold text-white">
        Welcome Back, Rimjhim 👋
      </h1>

      <p className="mt-3 text-slate-400">
        Here's your digital wellbeing summary for today.
      </p>

    </DashboardLayout>
  );
}

export default Overview;