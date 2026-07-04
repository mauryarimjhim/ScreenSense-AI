import { BrainCircuit, Lightbulb } from "lucide-react";

function AIRecommendationCard({ insight, appName, color }) {
  if (!insight) return null;

  return (
    <div className="glass-card glow-border p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}20` }}
        >
          <BrainCircuit size={20} style={{ color }} />
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">AI Insight</h3>
          <p className="text-xs text-slate-500">For {appName}</p>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-xl bg-white/5 p-4">
        <Lightbulb className="mt-0.5 shrink-0 text-violet-400" size={18} />
        <p className="text-sm leading-relaxed text-slate-300">
          {insight}
        </p>
      </div>
    </div>
  );
}

export default AIRecommendationCard;
