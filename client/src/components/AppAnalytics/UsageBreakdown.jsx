import UsageProgressBar from "./UsageProgressBar";

function UsageBreakdown({ breakdown }) {
  if (!breakdown || breakdown.length === 0) return null;

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
