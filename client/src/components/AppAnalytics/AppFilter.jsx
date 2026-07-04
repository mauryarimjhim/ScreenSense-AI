function AppFilter({ activeFilter, setActiveFilter }) {
  const filters = ["Today", "This Week", "This Month"];

  return (
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
  );
}

export default AppFilter;
