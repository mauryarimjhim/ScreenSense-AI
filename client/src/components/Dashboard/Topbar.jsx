import { Bell, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useUI } from "../../context/UIContext";

function Topbar({ onMenuClick }) {
  const { profile } = useUI();
  return (
    <header className="dashboard-topbar">

      {/* Left: mobile navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white lg:hidden"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Notification */}
        <button className="relative rounded-xl bg-white/5 p-2.5 text-slate-400 transition hover:bg-white/10 hover:text-white">
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-violet-500 ring-2 ring-[#060B17]" />
        </button>

        {/* Profile */}
        <Link to="/dashboard/settings" aria-label="Open profile settings" className="flex items-center gap-3 rounded-xl p-1 transition hover:bg-white/5">
          {profile.avatar ? <img src={profile.avatar} alt="Profile" className="h-9 w-9 rounded-full object-cover shadow-lg shadow-violet-500/20" /> : <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-sm font-bold text-white shadow-lg shadow-violet-500/20">{profile.name.slice(0, 1).toUpperCase()}</div>}
          <div className="hidden sm:block">
            <h3 className="text-sm font-semibold text-white">{profile.name}</h3>
            <p className="text-xs text-slate-500">{profile.role}</p>
          </div>
        </Link>
      </div>

    </header>
  );
}

export default Topbar;
