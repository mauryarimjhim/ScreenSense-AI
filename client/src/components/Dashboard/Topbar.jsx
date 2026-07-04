import { Bell, Search, Menu } from "lucide-react";

function Topbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800/60 bg-[#060B17]/80 px-4 backdrop-blur-xl sm:h-20 sm:px-8">

      {/* Left: Mobile menu + Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div className="hidden w-80 items-center rounded-xl border border-slate-800/60 bg-white/5 px-4 sm:flex">
          <Search className="text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500"
          />
          <kbd className="hidden rounded-md border border-slate-700 bg-slate-800/50 px-2 py-0.5 text-[10px] text-slate-500 md:inline">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Notification */}
        <button className="relative rounded-xl bg-white/5 p-2.5 text-slate-400 transition hover:bg-white/10 hover:text-white">
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-violet-500 ring-2 ring-[#060B17]" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-sm font-bold text-white shadow-lg shadow-violet-500/20">
            R
          </div>
          <div className="hidden sm:block">
            <h3 className="text-sm font-semibold text-white">Rimjhim</h3>
            <p className="text-xs text-slate-500">Student</p>
          </div>
        </div>
      </div>

    </header>
  );
}

export default Topbar;