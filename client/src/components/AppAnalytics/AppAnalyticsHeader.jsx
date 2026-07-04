function AppAnalyticsHeader({ activeFilter, setActiveFilter }) {
  const filters = ["Today", "This Week", "This Month"];

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          App Analytics
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Track how you spend time across applications.
        </p>
      </div>

      <div className="flex gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              activeFilter === filter
                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20"
                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AppAnalyticsHeader;