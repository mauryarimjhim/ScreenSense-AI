import { useEffect, useState } from "react";
import { BrainCircuit, Lightbulb, ArrowRight } from "lucide-react";
import { insightsApi } from "../../services/api";

function AIRecommendation() {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const data = await insightsApi.get(token);
        setRecommendation(data.recommendation || null);
      } catch (error) {
        console.error("Failed to fetch AI insights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();

    const interval = setInterval(fetchInsights, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card glow-border p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/20">
          <BrainCircuit className="text-violet-400" size={22} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">
            AI Recommendation
          </h2>
          <p className="text-xs text-slate-500">Based on your usage today</p>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-slate-400">Analyzing your habits...</p>
      ) : !recommendation ? (
        <p className="text-sm text-slate-400">
          Start tracking to receive personalized recommendations.
        </p>
      ) : (
        <>
          <p className="leading-relaxed text-slate-300">
            {recommendation.summary}
          </p>

          <div className="mt-5 space-y-3">
            {recommendation.tip && (
              <div className="flex items-start gap-3 rounded-xl bg-violet-600/10 p-4">
                <Lightbulb className="mt-0.5 shrink-0 text-violet-400" size={18} />
                <p className="text-sm text-violet-300">
                  {recommendation.tip}
                </p>
              </div>
            )}

            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-violet-500/30 py-2.5 text-sm font-medium text-violet-400 transition hover:bg-violet-500/10">
              View All Insights
              <ArrowRight size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default AIRecommendation;
