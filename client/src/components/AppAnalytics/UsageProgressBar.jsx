function UsageProgressBar({ title, time, percent, color }) {
  return (
    <div className="group">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-300">{title}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">{time}</span>
          <span className="text-xs font-semibold text-slate-400">{percent}%</span>
        </div>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${percent}%`,
            background: `linear-gradient(90deg, ${color}80, ${color})`,
          }}
        />
      </div>
    </div>
  );
}

export default UsageProgressBar;
