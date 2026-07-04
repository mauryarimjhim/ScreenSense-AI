import { TrendingUp, TrendingDown } from "lucide-react";

function StatCard({ title, value, icon: Icon, color, trend, trendValue }) {
  const isPositive = trend === "up";

  return (
    <div className="glass-card glass-card-hover p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            {value}
          </h2>
          {trendValue && (
            <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${
              isPositive ? "text-emerald-400" : "text-red-400"
            }`}>
              {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{trendValue} vs yesterday</span>
            </div>
          )}
        </div>

        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl sm:h-14 sm:w-14"
          style={{ backgroundColor: `${color}20`, }}
        >
          <Icon style={{ color }} size={24} />
        </div>
      </div>
    </div>
  );
}

export default StatCard;