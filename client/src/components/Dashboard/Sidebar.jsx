import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import {
  LayoutDashboard,
  Smartphone,
  BrainCircuit,
  BarChart3,
  Sparkles,
  FileText,
  Target,
  Settings,
  LogOut,
  TrendingUp,
  X,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
  { icon: Smartphone, label: "App Analytics", path: "/dashboard/app-analytics" },
  { icon: BarChart3, label: "Behaviour", path: "/dashboard/behaviour" },
  { icon: BrainCircuit, label: "AI Insights", path: "/dashboard/ai-insights" },
  { icon: TrendingUp, label: "Predictions", path: "/dashboard/predictions" },
  { icon: FileText, label: "Reports", path: "/dashboard/reports" },
  { icon: Target, label: "Goals", path: "/dashboard/goals" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

function Sidebar({ onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="dashboard-sidebar">

      {/* Logo */}
      <div className="flex items-center justify-between border-b border-slate-800/60 p-6">
        <NavLink to="/" className="flex items-center gap-3" onClick={onClose}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">
            Screen<span className="text-violet-400">Sense</span>
          </h1>
        </NavLink>

        {/* Mobile close */}
        <button
          onClick={onClose}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto px-3 py-4">
        <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Menu
        </p>

        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.path === "/dashboard"}
            onClick={onClose}
            className={({ isActive }) =>
              `flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-violet-600/15 text-violet-400 shadow-sm shadow-violet-500/5"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-violet-400 shadow-sm shadow-violet-400/50" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout remains anchored below the scrollable navigation. */}
      <div className="border-t border-slate-800/60 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
