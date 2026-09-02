export function formatMinutes(value = 0) {
  const minutes = Math.max(0, Math.round(value));
  const hours = Math.floor(minutes / 60);
  return hours ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
}

export function formatHour(hour) {
  const normalized = Number(hour) % 24;
  if (normalized === 0) return "12 AM";
  if (normalized === 12) return "12 PM";
  return normalized < 12 ? `${normalized} AM` : `${normalized - 12} PM`;
}

export function goalLabel(goal) {
  if (goal.goalType === "productive_time") return "Productive time";
  if (goal.goalType === "app_limit") return `${goal.appName} limit`;
  return "Screen time";
}
