// Predictions mock data

export const tomorrowPrediction = {
  screenTime: "5h 15m",
  confidence: 87,
  comparison: "-27 min vs today",
  breakdown: [
    { app: "Instagram", predicted: "2h 10m", change: "-15%", color: "#E1306C" },
    { app: "YouTube", predicted: "1h 20m", change: "+5%", color: "#FF0000" },
    { app: "WhatsApp", predicted: "50m", change: "-8%", color: "#25D366" },
    { app: "Chrome", predicted: "55m", change: "+10%", color: "#4285F4" },
  ],
};

export const weeklyForecast = [
  { day: "Mon", predicted: 5.2, actual: null, lower: 4.5, upper: 5.9 },
  { day: "Tue", predicted: 5.8, actual: null, lower: 5.0, upper: 6.6 },
  { day: "Wed", predicted: 4.5, actual: null, lower: 3.8, upper: 5.2 },
  { day: "Thu", predicted: 5.0, actual: null, lower: 4.2, upper: 5.8 },
  { day: "Fri", predicted: 6.2, actual: null, lower: 5.5, upper: 7.0 },
  { day: "Sat", predicted: 7.5, actual: null, lower: 6.5, upper: 8.5 },
  { day: "Sun", predicted: 6.0, actual: null, lower: 5.2, upper: 6.8 },
];

export const monthlyForecast = [
  { week: "W1", predicted: 38, actual: 41 },
  { week: "W2", predicted: 40, actual: 43 },
  { week: "W3", predicted: 37, actual: 39 },
  { week: "W4", predicted: 42, actual: null },
];

export const productivityPrediction = {
  tomorrowScore: 85,
  weekAvg: 78,
  trend: "improving",
  factors: [
    { factor: "No heavy social media predicted", impact: "+8%", type: "positive" },
    { factor: "2 focus sessions scheduled", impact: "+5%", type: "positive" },
    { factor: "Weekend pattern detected", impact: "-3%", type: "negative" },
  ],
};

export const riskScoreData = {
  score: 35,
  level: "Low",
  color: "#10B981",
  factors: [
    { name: "Screen addiction risk", value: 28, color: "#10B981" },
    { name: "Sleep disruption risk", value: 45, color: "#F59E0B" },
    { name: "Productivity decline risk", value: 32, color: "#10B981" },
    { name: "Digital fatigue risk", value: 38, color: "#F59E0B" },
  ],
};

export const forecastComparisonData = [
  { day: "Mon", predicted: 5.0, actual: 5.2 },
  { day: "Tue", predicted: 5.5, actual: 6.1 },
  { day: "Wed", predicted: 4.8, actual: 4.8 },
  { day: "Thu", predicted: 5.2, actual: 5.5 },
  { day: "Fri", predicted: 6.5, actual: 7.0 },
  { day: "Sat", predicted: 7.8, actual: 8.2 },
  { day: "Sun", predicted: 6.0, actual: 6.4 },
];
