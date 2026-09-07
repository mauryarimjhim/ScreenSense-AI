const User = require("../models/User");
const Usage = require("../models/Usage");
const Goal = require("../models/Goal");
const Notification = require("../models/Notification");

const startOfDay = () => { const value = new Date(); value.setHours(0, 0, 0, 0); return value; };
const dayKey = () => startOfDay().toISOString().slice(0, 10);

async function createNotification(data) {
  try { await Notification.create(data); } catch (error) { if (error.code !== 11000) throw error; }
}

async function generateReminders() {
  const start = startOfDay();
  const users = await User.find().select("_id");
  await Promise.all(users.map(async (user) => {
    const [usage, goals] = await Promise.all([
      Usage.find({ userId: user._id, date: { $gte: start } }),
      Goal.find({ userId: user._id, period: "daily" }),
    ]);
    const total = usage.reduce((sum, record) => sum + record.totalTime, 0);
    for (const goal of goals.filter((item) => item.goalType === "screen_time")) {
      const percent = Math.round((total / goal.targetMinutes) * 100);
      if (percent < 80) continue;
      const exceeded = percent >= 100;
      await createNotification({
        userId: user._id,
        type: "goal",
        title: exceeded ? "Screen-time goal exceeded" : "Screen-time goal reminder",
        message: exceeded ? `You have reached ${total} of ${goal.targetMinutes} minutes today.` : `You have used ${percent}% of today’s ${goal.targetMinutes}-minute screen-time goal.`,
        dedupeKey: `screen-goal-${goal._id}-${dayKey()}-${exceeded ? "exceeded" : "near"}`,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    }
  }));
}

function startReminderScheduler() {
  generateReminders().catch((error) => console.error("Initial reminder generation failed:", error.message));
  return setInterval(() => generateReminders().catch((error) => console.error("Reminder generation failed:", error.message)), 5 * 60 * 1000);
}

module.exports = { startReminderScheduler };
