import { useState } from "react";
import {
  User,
  Shield,
  Bell,
  Eye,
  Lock,
  Palette,
  Smartphone,
  LogOut,
  ChevronRight,
  Camera,
  Mail,
  Globe,
  Moon,
  Sun,
  Monitor,
  Trash2,
  Download,
  Key,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const tabs = [
  { key: "profile", label: "Profile", icon: User },
  { key: "account", label: "Account", icon: Shield },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "privacy", label: "Privacy", icon: Eye },
  { key: "security", label: "Security", icon: Lock },
  { key: "theme", label: "Theme", icon: Palette },
  { key: "devices", label: "Devices", icon: Smartphone },
];

/* ── Toggle Component ── */
function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? "bg-violet-600" : "bg-slate-700"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

/* ── Setting Row ── */
function SettingRow({ label, description, children }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-white/5 px-4 py-3.5">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white">{label}</p>
        {description && <p className="mt-0.5 text-xs text-slate-500">{description}</p>}
      </div>
      {children}
    </div>
  );
}

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  // Notification states
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [goalReminders, setGoalReminders] = useState(true);
  const [insightAlerts, setInsightAlerts] = useState(true);

  // Privacy
  const [shareData, setShareData] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [showProfile, setShowProfile] = useState(true);

  // Security
  const [twoFactor, setTwoFactor] = useState(false);
  const [biometric, setBiometric] = useState(true);

  // Theme
  const [theme, setTheme] = useState("dark");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white">Profile Settings</h2>

            {/* Avatar */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-2xl font-bold text-white shadow-lg shadow-violet-500/20">
                  R
                </div>
                <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-white shadow-md transition hover:bg-violet-500">
                  <Camera size={12} />
                </button>
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Rimjhim</h3>
                <p className="text-sm text-slate-400">Student</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">Full Name</label>
                <input defaultValue="Rimjhim" className="w-full rounded-xl border border-slate-800/60 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">Email</label>
                <input defaultValue="rimjhim@example.com" className="w-full rounded-xl border border-slate-800/60 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">Bio</label>
                <textarea defaultValue="Computer Science student passionate about digital wellbeing." rows={3} className="w-full rounded-xl border border-slate-800/60 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 resize-none" />
              </div>
              <button className="rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500 shadow-lg shadow-violet-500/20">
                Save Changes
              </button>
            </div>
          </div>
        );

      case "account":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white">Account Settings</h2>
            <div className="space-y-3">
              <SettingRow label="Email" description="rimjhim@example.com">
                <button className="text-xs font-medium text-violet-400 hover:text-violet-300">Change</button>
              </SettingRow>
              <SettingRow label="Username" description="@rimjhim_">
                <button className="text-xs font-medium text-violet-400 hover:text-violet-300">Edit</button>
              </SettingRow>
              <SettingRow label="Account Type" description="Free Plan">
                <button className="rounded-lg bg-violet-600/20 px-3 py-1.5 text-xs font-medium text-violet-400 hover:bg-violet-600/30">Upgrade</button>
              </SettingRow>
              <SettingRow label="Download Data" description="Export all your data">
                <button className="flex items-center gap-1.5 text-xs font-medium text-violet-400 hover:text-violet-300">
                  <Download size={14} /> Download
                </button>
              </SettingRow>
            </div>

            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
              <h3 className="text-sm font-semibold text-red-400">Danger Zone</h3>
              <p className="mt-1 text-xs text-slate-500">Permanently delete your account and all data.</p>
              <button className="mt-3 flex items-center gap-2 rounded-lg bg-red-500/20 px-4 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/30">
                <Trash2 size={14} /> Delete Account
              </button>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white">Notification Settings</h2>
            <div className="space-y-3">
              <SettingRow label="Push Notifications" description="Receive alerts on your device">
                <Toggle enabled={pushEnabled} onChange={setPushEnabled} />
              </SettingRow>
              <SettingRow label="Email Notifications" description="Receive weekly summaries via email">
                <Toggle enabled={emailEnabled} onChange={setEmailEnabled} />
              </SettingRow>
              <SettingRow label="Weekly Reports" description="Get notified when reports are ready">
                <Toggle enabled={weeklyReport} onChange={setWeeklyReport} />
              </SettingRow>
              <SettingRow label="Goal Reminders" description="Alerts when approaching daily goals">
                <Toggle enabled={goalReminders} onChange={setGoalReminders} />
              </SettingRow>
              <SettingRow label="AI Insight Alerts" description="New personalized insights available">
                <Toggle enabled={insightAlerts} onChange={setInsightAlerts} />
              </SettingRow>
            </div>
          </div>
        );

      case "privacy":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white">Privacy Settings</h2>
            <div className="space-y-3">
              <SettingRow label="Share Anonymized Data" description="Help improve ScreenSense AI">
                <Toggle enabled={shareData} onChange={setShareData} />
              </SettingRow>
              <SettingRow label="Usage Analytics" description="Allow analytics collection">
                <Toggle enabled={analytics} onChange={setAnalytics} />
              </SettingRow>
              <SettingRow label="Public Profile" description="Show profile to other users">
                <Toggle enabled={showProfile} onChange={setShowProfile} />
              </SettingRow>
              <SettingRow label="Data Retention" description="How long we keep your data">
                <select className="rounded-lg border border-slate-800 bg-white/5 px-3 py-1.5 text-xs text-white outline-none">
                  <option value="6">6 months</option>
                  <option value="12">1 year</option>
                  <option value="24">2 years</option>
                  <option value="forever">Forever</option>
                </select>
              </SettingRow>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white">Security Settings</h2>
            <div className="space-y-3">
              <SettingRow label="Change Password" description="Last changed 30 days ago">
                <button className="flex items-center gap-1.5 text-xs font-medium text-violet-400 hover:text-violet-300">
                  <Key size={14} /> Update
                </button>
              </SettingRow>
              <SettingRow label="Two-Factor Authentication" description="Add an extra layer of security">
                <Toggle enabled={twoFactor} onChange={setTwoFactor} />
              </SettingRow>
              <SettingRow label="Biometric Login" description="Use fingerprint or face ID">
                <Toggle enabled={biometric} onChange={setBiometric} />
              </SettingRow>
              <SettingRow label="Active Sessions" description="2 devices currently logged in">
                <button className="text-xs font-medium text-red-400 hover:text-red-300">Log Out All</button>
              </SettingRow>
            </div>
          </div>
        );

      case "theme":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white">Theme Settings</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { key: "dark", label: "Dark", icon: Moon, desc: "Easy on the eyes" },
                { key: "light", label: "Light", icon: Sun, desc: "Classic bright look" },
                { key: "system", label: "System", icon: Monitor, desc: "Match OS settings" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTheme(t.key)}
                  className={`rounded-xl border p-5 text-left transition ${
                    theme === t.key
                      ? "border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/10"
                      : "border-slate-800/60 bg-white/5 hover:border-slate-700"
                  }`}
                >
                  <t.icon size={24} className={theme === t.key ? "text-violet-400" : "text-slate-500"} />
                  <h4 className="mt-3 text-sm font-semibold text-white">{t.label}</h4>
                  <p className="mt-1 text-xs text-slate-500">{t.desc}</p>
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white">Accent Color</h3>
              <div className="flex gap-3">
                {["#8B5CF6", "#0EA5E9", "#10B981", "#F59E0B", "#EF4444", "#EC4899"].map((color) => (
                  <button
                    key={color}
                    className="h-8 w-8 rounded-full border-2 transition hover:scale-110"
                    style={{
                      backgroundColor: color,
                      borderColor: color === "#8B5CF6" ? "white" : "transparent",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case "devices":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white">Connected Devices</h2>
            <div className="space-y-3">
              {[
                { name: "iPhone 15 Pro", type: "Primary", lastActive: "Now", status: "active" },
                { name: "MacBook Air M2", type: "Secondary", lastActive: "2 hours ago", status: "active" },
                { name: "iPad Air", type: "Tablet", lastActive: "3 days ago", status: "inactive" },
              ].map((device, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl bg-white/5 p-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    device.status === "active" ? "bg-emerald-500/20" : "bg-slate-800"
                  }`}>
                    <Smartphone size={18} className={device.status === "active" ? "text-emerald-400" : "text-slate-500"} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white">{device.name}</p>
                    <p className="text-xs text-slate-500">{device.type} · {device.lastActive}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`h-2 w-2 rounded-full ${
                      device.status === "active" ? "bg-emerald-400" : "bg-slate-600"
                    }`} />
                    <button className="text-xs font-medium text-red-400 hover:text-red-300">
                      Disconnect
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="flex items-center gap-2 rounded-xl border border-dashed border-slate-700 bg-transparent px-4 py-3 text-sm text-slate-400 transition hover:border-violet-500 hover:text-violet-400">
              <Smartphone size={16} />
              Connect New Device
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Manage your account preferences and configurations.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Settings nav */}
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                activeTab === tab.key
                  ? "bg-violet-600/15 text-violet-400"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
              {activeTab === tab.key && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}

          {/* Logout */}
          <button
            onClick={() => navigate("/")}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>

        {/* Content */}
        <div className="glass-card p-5 sm:p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Settings;
