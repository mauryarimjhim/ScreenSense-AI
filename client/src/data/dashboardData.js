// Dashboard Overview mock data

export const weeklyScreenTimeData = [
  { day: "Mon", hours: 5.2, goal: 4.5 },
  { day: "Tue", hours: 6.1, goal: 4.5 },
  { day: "Wed", hours: 4.8, goal: 4.5 },
  { day: "Thu", hours: 5.5, goal: 4.5 },
  { day: "Fri", hours: 7.0, goal: 4.5 },
  { day: "Sat", hours: 8.2, goal: 4.5 },
  { day: "Sun", hours: 6.4, goal: 4.5 },
];

export const dailyUsageTrendData = [
  { hour: "6AM", minutes: 5 },
  { hour: "7AM", minutes: 12 },
  { hour: "8AM", minutes: 25 },
  { hour: "9AM", minutes: 38 },
  { hour: "10AM", minutes: 42 },
  { hour: "11AM", minutes: 28 },
  { hour: "12PM", minutes: 55 },
  { hour: "1PM", minutes: 62 },
  { hour: "2PM", minutes: 45 },
  { hour: "3PM", minutes: 35 },
  { hour: "4PM", minutes: 30 },
  { hour: "5PM", minutes: 48 },
  { hour: "6PM", minutes: 65 },
  { hour: "7PM", minutes: 72 },
  { hour: "8PM", minutes: 80 },
  { hour: "9PM", minutes: 88 },
  { hour: "10PM", minutes: 55 },
  { hour: "11PM", minutes: 22 },
];

export const topAppsData = [
  { name: "Instagram", time: "2h 14m", percent: 39, color: "#E1306C" },
  { name: "YouTube", time: "1h 32m", percent: 27, color: "#FF0000" },
  { name: "WhatsApp", time: "58m", percent: 17, color: "#25D366" },
  { name: "Chrome", time: "42m", percent: 12, color: "#4285F4" },
  { name: "Spotify", time: "18m", percent: 5, color: "#1DB954" },
];

export const recentActivitiesData = [
  {
    id: 1,
    type: "app_open",
    title: "Instagram session ended",
    description: "45 min spent — mostly Reels",
    time: "2 min ago",
    color: "#E1306C",
  },
  {
    id: 2,
    type: "goal",
    title: "Daily goal progress: 80%",
    description: "You're close to your 5h screen time goal",
    time: "15 min ago",
    color: "#8B5CF6",
  },
  {
    id: 3,
    type: "insight",
    title: "AI Insight: Focus drop detected",
    description: "App switching increased 3x between 2–4 PM",
    time: "1 hr ago",
    color: "#F59E0B",
  },
  {
    id: 4,
    type: "unlock",
    title: "Phone unlocked 12 times",
    description: "Between 12 PM – 1 PM (above average)",
    time: "2 hrs ago",
    color: "#EF4444",
  },
  {
    id: 5,
    type: "app_open",
    title: "YouTube session ended",
    description: "1h 10m spent — 40 min on Shorts",
    time: "3 hrs ago",
    color: "#FF0000",
  },
  {
    id: 6,
    type: "achievement",
    title: "Achievement unlocked! 🏆",
    description: "3-day streak of under 5h screen time",
    time: "5 hrs ago",
    color: "#10B981",
  },
];

export const goalProgressData = {
  current: 4,
  goal: 5,
  unit: "hours",
  percentage: 80,
};
