import { BrainCircuit, Lightbulb, ArrowRight } from "lucide-react";

function AIRecommendation() {
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
          <p className="text-xs text-slate-500">Based on your weekly patterns</p>
        </div>
      </div>

      <p className="leading-relaxed text-slate-300">
        Instagram usage has increased by
        <span className="font-semibold text-violet-400"> 18% </span>
        this week, with most time spent on Reels after 9 PM.
      </p>

      <div className="mt-5 space-y-3">
        <div className="flex items-start gap-3 rounded-xl bg-violet-600/10 p-4">
          <Lightbulb className="mt-0.5 shrink-0 text-violet-400" size={18} />
          <p className="text-sm text-violet-300">
            Reduce Instagram usage by 20 minutes after 10 PM to improve your sleep consistency.
          </p>
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-violet-500/30 py-2.5 text-sm font-medium text-violet-400 transition hover:bg-violet-500/10">
          View All Insights
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default AIRecommendation;