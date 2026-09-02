import { useState } from "react";
import { Target, Flame, Trophy, CheckCircle2, Plus, Trash2 } from "lucide-react";
import { goalsApi } from "../../services/api";
import { useFeatureAnalytics } from "../../hooks/useFeatureAnalytics";
import { formatMinutes, goalLabel } from "../../utils/formatters";

const statusColors = { exceeded: "text-red-400 bg-red-500/20", close: "text-violet-400 bg-violet-500/20", on_track: "text-sky-400 bg-sky-500/20" };
function Stat({ icon: Icon, label, value, color }) { return <div className="glass-card p-5"><div className="flex items-center gap-3"><div className={`rounded-xl p-2.5 ${color}`}><Icon size={20}/></div><div><p className="text-xs text-slate-500">{label}</p><p className="text-xl font-bold text-white">{value}</p></div></div></div>; }

function Goals() {
  const { data, goalProgress, streak, loading, error } = useFeatureAnalytics();
  const [showForm, setShowForm] = useState(false), [submitting, setSubmitting] = useState(false), [message, setMessage] = useState("");
  const goals = goalProgress.filter((goal) => !goal.isDefault || goalProgress.length === 1);
  const createGoal = async (event) => {
    event.preventDefault(); const form = new FormData(event.currentTarget); setSubmitting(true); setMessage("");
    try { await goalsApi.create(localStorage.getItem("token"), { goalType: form.get("goalType"), appName: form.get("appName") || undefined, targetMinutes: Number(form.get("targetMinutes")), period: form.get("period") }); setMessage("Goal created. Reload to see its calculated progress."); event.currentTarget.reset(); setShowForm(false); }
    catch (requestError) { setMessage(requestError.message); } finally { setSubmitting(false); }
  };
  const deleteGoal = async (id) => { if (!id || id === "default-screen-time") return; try { await goalsApi.remove(localStorage.getItem("token"), id); window.location.reload(); } catch (requestError) { setMessage(requestError.message); } };
  return <div className="dashboard-page">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div className="page-header"><h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">Goals</h1><p className="text-sm text-slate-400">Live progress calculated from your tracked activity.</p></div><button onClick={() => setShowForm((value) => !value)} className="flex w-fit items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-500"><Plus size={16}/> Add goal</button></div>
    {showForm && <form onSubmit={createGoal} className="glass-card grid gap-3 p-5 sm:grid-cols-4"><select name="goalType" className="rounded-lg bg-slate-900 p-3 text-sm text-white"><option value="screen_time">Screen time</option><option value="productive_time">Productive time</option><option value="app_limit">App limit</option></select><input name="appName" placeholder="App name (for app limit)" className="rounded-lg bg-slate-900 p-3 text-sm text-white"/><input required min="1" type="number" name="targetMinutes" placeholder="Minutes" className="rounded-lg bg-slate-900 p-3 text-sm text-white"/><div className="flex gap-2"><select name="period" className="min-w-0 flex-1 rounded-lg bg-slate-900 p-3 text-sm text-white"><option value="daily">Daily</option><option value="weekly">Weekly</option></select><button disabled={submitting} className="rounded-lg bg-violet-600 px-4 text-sm text-white">{submitting ? "Saving…" : "Save"}</button></div></form>}
    {message && <p className="rounded-lg bg-violet-500/10 p-3 text-sm text-violet-200">{message}</p>}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Stat icon={Flame} label="Current Streak" value={`${streak} days`} color="text-orange-400 bg-orange-500/20"/><Stat icon={Trophy} label="Goals Tracked" value={loading ? "…" : `${goals.length}`} color="text-violet-400 bg-violet-500/20"/><Stat icon={CheckCircle2} label="On Track" value={loading ? "…" : `${goals.filter((goal) => goal.status === "on_track").length}`} color="text-emerald-400 bg-emerald-500/20"/><Stat icon={Target} label="Today's Screen Time" value={formatMinutes(data?.summary?.totalToday)} color="text-sky-400 bg-sky-500/20"/></div>
    {loading && <p className="text-sm text-slate-400">Loading goals…</p>}{error && <p className="text-sm text-red-300">{error}</p>}
    {!loading && <div className="grid gap-4 sm:grid-cols-2">{goals.map((goal) => <div key={goal.goalId} className="glass-card p-5"><div className="mb-3 flex items-start justify-between gap-3"><div className="flex gap-3"><div className="rounded-lg bg-violet-500/20 p-2"><Target className="text-violet-400" size={18}/></div><div><h2 className="text-sm font-semibold text-white">{goalLabel(goal)}</h2><p className="text-xs text-slate-500">{goal.isDefault ? "Suggested daily target" : "Your saved goal"}</p></div></div><div className="flex items-center gap-2"><span className={`rounded-md px-2 py-1 text-[10px] font-semibold ${statusColors[goal.status] || "bg-slate-800 text-slate-400"}`}>{goal.status.replace("_", " ")}</span>{!goal.isDefault && <button onClick={() => deleteGoal(goal.goalId)} className="text-slate-500 hover:text-red-400" aria-label="Delete goal"><Trash2 size={15}/></button>}</div></div><div className="mb-2 flex justify-between text-sm"><span className="font-semibold text-white">{formatMinutes(goal.currentMinutes)}</span><span className="text-slate-500">Target {formatMinutes(goal.targetMinutes)}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-sky-500" style={{width:`${goal.percentage}%`}}/></div><p className="mt-2 text-right text-xs text-slate-500">{goal.percentage}% of target</p></div>)}</div>}
  </div>;
}
export default Goals;
