import UsageProgressBar from "./UsageProgressBar";

function UsageBreakdown({ breakdown }) {
  if (!breakdown || breakdown.length === 0) {
    return <div className="glass-card p-5 sm:p-6"><h3 className="text-base font-semibold text-white">Usage Breakdown</h3><p className="mt-3 text-sm text-slate-500">Activity categories will appear after the tracker records time on this app.</p></div>;
  }

  return (
    <div className="glass-card p-5 sm:p-6">
      <h3 className="mb-5 text-base font-semibold text-white">Usage Breakdown</h3>
      <div className="space-y-4">
        {breakdown.map((item) => (
          <UsageProgressBar
            key={item.title}
            title={item.title}
            time={item.time}
            percent={item.percent}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
}

export default UsageBreakdown;
