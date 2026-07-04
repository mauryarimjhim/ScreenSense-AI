// AI Insights mock data

export const weeklySummary = {
  title: "Your Weekly AI Summary",
  period: "June 23 – June 29, 2026",
  highlights: [
    { text: "Total screen time was 43h 12m — 8% higher than last week", type: "warning" },
    { text: "Instagram Reels consumption peaked on Saturday at 3h 20m", type: "alert" },
    { text: "Productive app usage (Chrome Study, LinkedIn) increased by 15%", type: "positive" },
    { text: "Sleep schedule disrupted on 3 nights due to late-night usage", type: "alert" },
    { text: "Focus sessions improved — average score up from 72 to 78", type: "positive" },
  ],
  overallScore: 72,
};

export const productivityData = {
  score: 82,
  breakdown: [
    { category: "Productive", hours: "3h 45m", percent: 45, color: "#10B981" },
    { category: "Neutral", hours: "2h 30m", percent: 30, color: "#F59E0B" },
    { category: "Unproductive", hours: "2h 05m", percent: 25, color: "#EF4444" },
  ],
  weeklyTrend: [
    { day: "Mon", productive: 4.2, unproductive: 1.8 },
    { day: "Tue", productive: 3.5, unproductive: 2.5 },
    { day: "Wed", productive: 4.8, unproductive: 1.2 },
    { day: "Thu", productive: 3.8, unproductive: 2.0 },
    { day: "Fri", productive: 3.0, unproductive: 3.2 },
    { day: "Sat", productive: 2.5, unproductive: 4.5 },
    { day: "Sun", productive: 3.2, unproductive: 2.8 },
  ],
};

export const sleepImpactData = {
  avgBedtime: "11:45 PM",
  avgLastUsage: "11:32 PM",
  impactScore: 65,
  recommendations: [
    "Stop using screens 30 minutes before bedtime",
    "Enable blue light filter after 9 PM",
    "Your sleep quality dropped 18% on heavy usage days",
  ],
  weeklyData: [
    { day: "Mon", lastUsage: 23.5, sleepQuality: 78 },
    { day: "Tue", lastUsage: 24.0, sleepQuality: 65 },
    { day: "Wed", lastUsage: 22.8, sleepQuality: 85 },
    { day: "Thu", lastUsage: 23.2, sleepQuality: 72 },
    { day: "Fri", lastUsage: 24.5, sleepQuality: 55 },
    { day: "Sat", lastUsage: 25.0, sleepQuality: 48 },
    { day: "Sun", lastUsage: 23.8, sleepQuality: 70 },
  ],
};

export const focusScoreData = {
  current: 78,
  average: 72,
  best: 95,
  trend: "+6",
  breakdown: [
    { metric: "Continuous Usage", score: 82, color: "#8B5CF6" },
    { metric: "App Switches", score: 68, color: "#0EA5E9" },
    { metric: "Notification Response", score: 75, color: "#F59E0B" },
    { metric: "Focus Sessions", score: 88, color: "#10B981" },
  ],
};

export const recommendationsData = [
  {
    id: 1,
    priority: "high",
    title: "Reduce Reels consumption after 9 PM",
    description: "Your Instagram Reels usage spikes 3x after 9 PM. Setting a timer could save 40+ min/day.",
    impact: "Could improve sleep quality by 20%",
    icon: "🎬",
  },
  {
    id: 2,
    priority: "medium",
    title: "Batch notification checks",
    description: "You check notifications 50+ times/day. Try batching to 3–4 times for better focus.",
    impact: "Could reduce unlocks by 35%",
    icon: "🔔",
  },
  {
    id: 3,
    priority: "medium",
    title: "Schedule productive app time",
    description: "Your most productive hours are 9–11 AM. Block this time for study and coding.",
    impact: "Could boost productivity by 15%",
    icon: "📚",
  },
  {
    id: 4,
    priority: "low",
    title: "Try the 20-20-20 eye care rule",
    description: "Every 20 minutes, look at something 20 feet away for 20 seconds.",
    impact: "Reduces eye strain significantly",
    icon: "👁️",
  },
];

export const dailyTipsData = [
  "Your phone-free morning streak is 5 days. Keep it going! 🌅",
  "Try keeping your phone in another room during meals 🍽️",
  "Your focus score peaks at 10 AM — schedule deep work then 🧠",
  "Social media usage dropped 12% this week. Great progress! 📉",
];

export const habitAnalysisData = {
  patterns: [
    { habit: "First unlock", time: "6:45 AM", trend: "consistent", emoji: "⏰" },
    { habit: "Peak social media", time: "9:00 PM", trend: "increasing", emoji: "📱" },
    { habit: "Last screen use", time: "11:32 PM", trend: "late", emoji: "🌙" },
    { habit: "Longest session", duration: "1h 45m", app: "Instagram", emoji: "📸" },
    { habit: "Most productive hour", time: "10:00 AM", trend: "stable", emoji: "🚀" },
  ],
};

export const addictiveAppData = {
  name: "Instagram",
  icon: "📸",
  color: "#E1306C",
  dailyAvg: "2h 20m",
  weeklyIncrease: "+18%",
  mainFeature: "Reels (52% of usage)",
  addictionScore: 85,
  peakDay: "Saturday",
  peakUsage: "3h 20m",
};
