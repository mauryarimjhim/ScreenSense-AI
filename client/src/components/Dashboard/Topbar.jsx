import { Bell, Search } from "lucide-react";

function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-[#060B17] px-8">

      {/* Search */}

      <div className="flex w-96 items-center rounded-xl border border-slate-700 bg-[#0B1120] px-4">

        <Search className="text-slate-400" size={20} />

        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent px-3 py-3 text-white outline-none placeholder:text-slate-500"
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        <button className="rounded-full bg-[#0B1120] p-3 text-white">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 font-bold text-white">
            R
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Rimjhim
            </h3>

            <p className="text-sm text-slate-400">
              Student
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;