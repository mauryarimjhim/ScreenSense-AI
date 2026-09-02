import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { dashboardApi } from "../../services/api";

function Dashboard() {
  const [productivity, setProductivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login again.");
          return;
        }

        const data = await dashboardApi.productivity(token);

        setProductivity(data.productivity);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            Here's an overview of your digital activity.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-slate-800 bg-[#0B1120] p-6 text-slate-400">
            Loading your analytics...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-400">
            {error}
          </div>
        )}

        {/* Analytics */}
        {!loading && productivity && (
          <>
            {/* Stats */}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

              <div className="rounded-2xl border border-slate-800 bg-[#0B1120] p-6">
                <p className="text-sm text-slate-400">
                  Total Screen Time
                </p>

                <h2 className="mt-3 text-3xl font-bold text-white">
                  {productivity.totalScreenTime} min
                </h2>
              </div>


              <div className="rounded-2xl border border-slate-800 bg-[#0B1120] p-6">
                <p className="text-sm text-slate-400">
                  Productivity Score
                </p>

                <h2 className="mt-3 text-3xl font-bold text-violet-400">
                  {productivity.score}%
                </h2>
              </div>


              <div className="rounded-2xl border border-slate-800 bg-[#0B1120] p-6">
                <p className="text-sm text-slate-400">
                  Productive Time
                </p>

                <h2 className="mt-3 text-3xl font-bold text-green-400">
                  {productivity.productiveTime} min
                </h2>
              </div>


              <div className="rounded-2xl border border-slate-800 bg-[#0B1120] p-6">
                <p className="text-sm text-slate-400">
                  Unproductive Time
                </p>

                <h2 className="mt-3 text-3xl font-bold text-red-400">
                  {productivity.unproductiveTime} min
                </h2>
              </div>

            </div>


            {/* Time breakdown */}
            <div className="rounded-2xl border border-slate-800 bg-[#0B1120] p-6">

              <h2 className="text-xl font-semibold text-white">
                Screen Time Breakdown
              </h2>

              <div className="mt-6 space-y-5">

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-300">
                      Productive
                    </span>

                    <span className="text-green-400">
                      {productivity.productiveTime} min
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-green-500"
                      style={{
                        width: `${
                          productivity.totalScreenTime
                            ? (productivity.productiveTime /
                                productivity.totalScreenTime) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>


                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-300">
                      Neutral
                    </span>

                    <span className="text-yellow-400">
                      {productivity.neutralTime} min
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-yellow-500"
                      style={{
                        width: `${
                          productivity.totalScreenTime
                            ? (productivity.neutralTime /
                                productivity.totalScreenTime) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>


                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-300">
                      Unproductive
                    </span>

                    <span className="text-red-400">
                      {productivity.unproductiveTime} min
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-red-500"
                      style={{
                        width: `${
                          productivity.totalScreenTime
                            ? (productivity.unproductiveTime /
                                productivity.totalScreenTime) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

              </div>
            </div>
          </>
        )}

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;