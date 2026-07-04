import { Search } from "lucide-react";

function AppSearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="mb-6">
      <div className="flex items-center rounded-xl border border-slate-800/60 bg-white/5 px-4">
        <Search className="text-slate-500" size={18} />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search apps..."
          className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-xs text-slate-500 transition hover:text-white"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default AppSearchBar;