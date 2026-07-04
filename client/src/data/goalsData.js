// Goals mock data

export const dailyGoals = [
  { id: 1, title: "Screen time under 5 hours", target: "5h", current: "4h 12m", percent: 84, status: "on-track" },
  { id: 2, title: "No social media before 9 AM", target: "Complete", current: "Done", percent: 100, status: "completed" },
  { id: 3, title: "Complete 2 focus sessions", target: "2 sessions", current: "1 session", percent: 50, status: "in-progress" },
  { id: 4, title: "Phone unlocks under 100", target: "100", current: "82", percent: 82, status: "on-track" },
];

export const weeklyGoals = [
  { id: 1, title: "Total screen time under 35 hours", target: "35h", current: "28h 40m", percent: 82, status: "on-track" },
  { id: 2, title: "Complete 10 focus sessions", target: "10", current: "7", percent: 70, status: "in-progress" },
  { id: 3, title: "Reduce Instagram by 20%", target: "-20%", current: "-12%", percent: 60, status: "in-progress" },
  { id: 4, title: "Read for 30 min daily", target: "7 days", current: "5 days", percent: 71, status: "on-track" },
];

export const monthlyGoals = [
  { id: 1, title: "Average daily screen time under 5h", target: "5h avg", current: "5h 15m", percent: 95, status: "close" },
  { id: 2, title: "Productivity score above 75%", target: "75%", current: "72%", percent: 96, status: "close" },
  { id: 3, title: "Complete 40 focus sessions", target: "40", current: "28", percent: 70, status: "in-progress" },
  { id: 4, title: "Reduce total notifications by 30%", target: "-30%", current: "-22%", percent: 73, status: "in-progress" },
];

export const achievementsData = [
  { id: 1, title: "Early Bird", description: "No phone before 8 AM for 7 days", icon: "🌅", earned: true, date: "June 15" },
  { id: 2, title: "Focus Master", description: "Complete 10 focus sessions in a week", icon: "🧠", earned: true, date: "June 20" },
  { id: 3, title: "Digital Detox", description: "Under 3 hours screen time in a day", icon: "🧘", earned: true, date: "June 12" },
  { id: 4, title: "Streak King", description: "7-day goal completion streak", icon: "🔥", earned: true, date: "June 22" },
  { id: 5, title: "Night Owl Reformed", description: "No screens after 10 PM for 5 days", icon: "🌙", earned: false, progress: 60 },
  { id: 6, title: "Productivity Pro", description: "Maintain 80%+ productivity for 2 weeks", icon: "🚀", earned: false, progress: 45 },
  { id: 7, title: "Social Media Free", description: "No social media for 24 hours", icon: "📵", earned: false, progress: 0 },
  { id: 8, title: "Marathon Focus", description: "2-hour uninterrupted focus session", icon: "⏱️", earned: false, progress: 75 },
];

export const streakData = {
  current: 7,
  longest: 14,
  thisWeek: [true, true, true, true, true, true, false],
  weekDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};
