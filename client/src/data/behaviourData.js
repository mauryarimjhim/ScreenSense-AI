// Behaviour Analytics mock data

export const unlockTimelineData = [
  { time: "6 AM", unlocks: 2 },
  { time: "7 AM", unlocks: 5 },
  { time: "8 AM", unlocks: 8 },
  { time: "9 AM", unlocks: 12 },
  { time: "10 AM", unlocks: 15 },
  { time: "11 AM", unlocks: 9 },
  { time: "12 PM", unlocks: 18 },
  { time: "1 PM", unlocks: 14 },
  { time: "2 PM", unlocks: 10 },
  { time: "3 PM", unlocks: 8 },
  { time: "4 PM", unlocks: 6 },
  { time: "5 PM", unlocks: 11 },
  { time: "6 PM", unlocks: 13 },
  { time: "7 PM", unlocks: 9 },
  { time: "8 PM", unlocks: 7 },
  { time: "9 PM", unlocks: 12 },
  { time: "10 PM", unlocks: 5 },
  { time: "11 PM", unlocks: 2 },
];

export const notificationData = [
  { app: "WhatsApp", count: 84, color: "#25D366" },
  { app: "Instagram", count: 52, color: "#E1306C" },
  { app: "YouTube", count: 28, color: "#FF0000" },
  { app: "Gmail", count: 22, color: "#EA4335" },
  { app: "LinkedIn", count: 15, color: "#0A66C2" },
  { app: "Spotify", count: 8, color: "#1DB954" },
];

export const peakUsageData = [
  { hour: "6AM", value: 10 },
  { hour: "7AM", value: 20 },
  { hour: "8AM", value: 35 },
  { hour: "9AM", value: 50 },
  { hour: "10AM", value: 60 },
  { hour: "11AM", value: 40 },
  { hour: "12PM", value: 70 },
  { hour: "1PM", value: 80 },
  { hour: "2PM", value: 55 },
  { hour: "3PM", value: 45 },
  { hour: "4PM", value: 35 },
  { hour: "5PM", value: 50 },
  { hour: "6PM", value: 65 },
  { hour: "7PM", value: 75 },
  { hour: "8PM", value: 90 },
  { hour: "9PM", value: 95 },
  { hour: "10PM", value: 60 },
  { hour: "11PM", value: 25 },
];

export const focusSessionsData = [
  { id: 1, title: "Morning Study", duration: "45 min", score: 92, time: "9:00 AM", status: "completed" },
  { id: 2, title: "Coding Session", duration: "1h 20m", score: 88, time: "11:00 AM", status: "completed" },
  { id: 3, title: "Reading", duration: "30 min", score: 95, time: "2:00 PM", status: "completed" },
  { id: 4, title: "Project Work", duration: "55 min", score: 78, time: "4:00 PM", status: "interrupted" },
];

export const appSwitchData = [
  { time: "9AM", switches: 5 },
  { time: "10AM", switches: 8 },
  { time: "11AM", switches: 12 },
  { time: "12PM", switches: 18 },
  { time: "1PM", switches: 15 },
  { time: "2PM", switches: 22 },
  { time: "3PM", switches: 28 },
  { time: "4PM", switches: 20 },
  { time: "5PM", switches: 14 },
  { time: "6PM", switches: 10 },
  { time: "7PM", switches: 16 },
  { time: "8PM", switches: 12 },
];

export const heatmapData = [
  // Each row = day, each value = intensity (0-100) for that hour slot
  { day: "Mon", hours: [0,5,10,15,30,45,55,60,50,40,35,50,65,55,45,40,55,70,80,85,75,50,25,10] },
  { day: "Tue", hours: [0,0,5,20,35,50,60,65,55,45,40,55,70,60,50,45,60,75,85,90,80,55,30,15] },
  { day: "Wed", hours: [0,5,8,18,28,40,48,52,45,38,32,45,55,48,40,38,50,62,72,78,68,45,22,8] },
  { day: "Thu", hours: [0,0,12,22,38,52,62,68,58,48,42,58,72,62,52,48,62,78,88,92,82,58,32,12] },
  { day: "Fri", hours: [0,8,15,25,40,55,65,72,62,52,45,60,75,65,55,50,65,80,90,95,85,60,35,18] },
  { day: "Sat", hours: [0,0,5,10,20,35,50,60,70,65,55,60,70,75,60,55,65,80,90,95,88,65,40,20] },
  { day: "Sun", hours: [0,5,10,15,25,40,55,65,60,50,45,55,65,60,50,48,58,72,82,88,78,55,30,12] },
];

export const weeklyBehaviourData = [
  { day: "Mon", screenTime: 5.2, unlocks: 120, switches: 85, focusScore: 72 },
  { day: "Tue", screenTime: 6.1, unlocks: 145, switches: 98, focusScore: 65 },
  { day: "Wed", screenTime: 4.8, unlocks: 105, switches: 72, focusScore: 80 },
  { day: "Thu", screenTime: 5.5, unlocks: 132, switches: 90, focusScore: 74 },
  { day: "Fri", screenTime: 7.0, unlocks: 158, switches: 110, focusScore: 60 },
  { day: "Sat", screenTime: 8.2, unlocks: 175, switches: 125, focusScore: 55 },
  { day: "Sun", screenTime: 6.4, unlocks: 140, switches: 95, focusScore: 70 },
];
