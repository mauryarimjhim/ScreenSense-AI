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
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview" },
  { icon: Smartphone, label: "App Analytics" },
  { icon: BarChart3, label: "Behaviour Analytics" },
  { icon: BrainCircuit, label: "AI Insights" },
  { icon: Sparkles, label: "Predictions" },
  { icon: FileText, label: "Reports" },
  { icon: Target, label: "Goals" },
  { icon: Settings, label: "Settings" },
];

function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-[#0B1120]">

      {/* Logo */}
      <div className="border-b border-slate-800 p-6">

        <h1 className="text-2xl font-bold text-white">
          Screen<span className="text-violet-500">Sense AI</span>
        </h1>

      </div>

      {/* Menu */}

      <div className="flex-1 px-4 py-6">

        {menuItems.map((item) => (
          <button
            key={item.label}
            className="mb-2 flex w-full items-center gap-4 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-violet-600 hover:text-white"
          >
            <item.icon size={22} />
            <span>{item.label}</span>
          </button>
        ))}

      </div>

      {/* Logout */}

      <div className="border-t border-slate-800 p-4">

        <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500 hover:text-white">

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;