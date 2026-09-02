const Usage = require("../models/Usage");
const Goal = require("../models/Goal");

const dayKey = (value) => new Date(value).toISOString().slice(0, 10);
const startOfLocalDay = (value = new Date()) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
};

const createDaySeries = (count) => {
  const today = startOfLocalDay();
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (count - 1 - index));
    return { date: dayKey(date), label: date.toLocaleDateString("en-US", { weekday: "short" }), total: 0, productive: 0, unproductive: 0, neutral: 0 };
  });
};

// ======================================================
// FEATURE ANALYTICS
// GET /api/analytics/features
// ======================================================
exports.getFeatureAnalytics = async (req, res) => {
  try {
    const rangeStart = startOfLocalDay();
    rangeStart.setDate(rangeStart.getDate() - 34);
    const usage = await Usage.find({ userId: req.user.id, date: { $gte: rangeStart } }).sort({ date: 1 });
    const goals = await Goal.find({ userId: req.user.id }).sort({ createdAt: -1 });
    const daily = createDaySeries(35);
    const dailyByDate = Object.fromEntries(daily.map((item) => [item.date, item]));
    const todayKey = dayKey(new Date());
    const apps = {};
    const activities = {};
    const hourly = Array.from({ length: 24 }, (_, hour) => ({ hour, minutes: 0, sessions: 0 }));

    usage.forEach((record) => {
      const key = dayKey(record.date);
      const bucket = dailyByDate[key];
      if (bucket) {
        bucket.total += record.totalTime;
        bucket[record.category] += record.totalTime;
      }
      if (key !== todayKey) return;
      const app = apps[record.appName] || { name: record.appName, totalMinutes: 0, sessions: 0, productive: 0, unproductive: 0, neutral: 0, hourly: Array(24).fill(0), activities: {} };
      app.totalMinutes += record.totalTime;
      app.sessions += 1;
      app[record.category] += record.totalTime;
      const hour = new Date(record.createdAt || record.date).getHours();
      app.hourly[hour] += record.totalTime;
      hourly[hour].minutes += record.totalTime;
      hourly[hour].sessions += 1;
      const recordActivities = record.activities ? Object.fromEntries(record.activities) : {};
      Object.entries(recordActivities).forEach(([name, minutes]) => {
        app.activities[name] = (app.activities[name] || 0) + minutes;
        activities[name] = (activities[name] || 0) + minutes;
      });
      apps[record.appName] = app;
    });

    const appUsage = Object.values(apps).map((app) => ({
      ...app,
      peakHour: app.hourly.indexOf(Math.max(...app.hourly)),
      hourly: app.hourly.map((minutes, hour) => ({ hour, minutes })),
      activities: Object.entries(app.activities).map(([name, minutes]) => ({ name, minutes })).sort((a, b) => b.minutes - a.minutes),
    })).sort((a, b) => b.totalMinutes - a.totalMinutes);
    const lastSevenDays = daily.slice(-7);
    const today = dailyByDate[todayKey] || daily[daily.length - 1];
    const activeDays = lastSevenDays.filter((item) => item.total > 0);
    const averageScreenTime = activeDays.length ? Math.round(lastSevenDays.reduce((total, item) => total + item.total, 0) / activeDays.length) : 0;
    const averageProductivity = activeDays.length ? Math.round(activeDays.reduce((total, item) => total + (item.total ? ((item.productive + item.neutral * 0.5) / item.total) * 100 : 0), 0) / activeDays.length) : 0;
    const totalToday = today.total;
    const productivityScore = totalToday ? Math.round(((today.productive + today.neutral * 0.5) / totalToday) * 100) : 0;
    const appForecast = appUsage.map((app) => ({ name: app.name, minutes: Math.round(app.totalMinutes / Math.max(activeDays.length, 1)) })).slice(0, 5);
    const reports = [7, 14, 21, 28].map((offset, index) => {
      const segment = daily.slice(Math.max(0, daily.length - offset - 7), daily.length - offset);
      const total = segment.reduce((sum, item) => sum + item.total, 0);
      const productive = segment.reduce((sum, item) => sum + item.productive, 0);
      const neutral = segment.reduce((sum, item) => sum + item.neutral, 0);
      return { id: index + 1, label: `Week ${index + 1}`, totalMinutes: total, averageMinutes: Math.round(total / 7), productivityScore: total ? Math.round(((productive + neutral * 0.5) / total) * 100) : 0 };
    }).reverse();

    return res.json({
      success: true,
      generatedAt: new Date(),
      summary: { totalToday, productiveToday: today.productive, unproductiveToday: today.unproductive, neutralToday: today.neutral, productivityScore, averageScreenTime, averageProductivity },
      daily,
      weekly: lastSevenDays,
      apps: appUsage,
      hourly,
      activities: Object.entries(activities).map(([name, minutes]) => ({ name, minutes })).sort((a, b) => b.minutes - a.minutes),
      predictions: { tomorrowMinutes: averageScreenTime, productivityScore: averageProductivity, apps: appForecast, confidence: Math.min(95, activeDays.length * 14) },
      reports,
      goals,
    });
  } catch (error) {
    console.error("Feature analytics error:", error);
    return res.status(500).json({ success: false, message: "Failed to build feature analytics" });
  }
};

// ======================================================
// DAILY ANALYTICS
// GET /api/analytics/daily
// ======================================================

exports.getDailyAnalytics = async (req, res) => {
  try {
    const { deviceType } = req.query;

    // Start of today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // Start of tomorrow
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    // Build query
    const query = {
      userId: req.user.id,
      date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    };

    // Optional device filter
    if (deviceType) {
      query.deviceType = deviceType;
    }

    const usage = await Usage.find(query);

    // ------------------------------------------
    // Calculate totals
    // ------------------------------------------

    let totalScreenTime = 0;
    let productiveTime = 0;
    let neutralTime = 0;
    let unproductiveTime = 0;

    const appMap = {};

    usage.forEach((record) => {
      totalScreenTime += record.totalTime;

      if (record.category === "productive") {
        productiveTime += record.totalTime;
      } else if (record.category === "unproductive") {
        unproductiveTime += record.totalTime;
      } else {
        neutralTime += record.totalTime;
      }

      if (!appMap[record.appName]) {
        appMap[record.appName] = 0;
      }

      appMap[record.appName] += record.totalTime;
    });

    // ------------------------------------------
    // App usage
    // ------------------------------------------

    const appUsage = Object.entries(appMap)
      .map(([appName, totalTime]) => ({
        appName,
        totalTime,
      }))
      .sort((a, b) => b.totalTime - a.totalTime);

    const mostUsedApp =
      appUsage.length > 0 ? appUsage[0] : null;

    // ------------------------------------------
    // Hourly usage (based on when records were logged)
    // ------------------------------------------

    const hourlyMap = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      minutes: 0,
    }));

    usage.forEach((record) => {
      const hour = new Date(record.createdAt).getHours();
      hourlyMap[hour].minutes += record.totalTime;
    });

    const formatHourLabel = (hour) => {
      if (hour === 0) return "12AM";
      if (hour < 12) return `${hour}AM`;
      if (hour === 12) return "12PM";
      return `${hour - 12}PM`;
    };

    const hourlyUsage = hourlyMap.map(({ hour, minutes }) => ({
      hour: formatHourLabel(hour),
      minutes,
    }));

    // ------------------------------------------
    // Response
    // ------------------------------------------

    return res.status(200).json({
      success: true,

      date: startOfDay,

      analytics: {
        totalScreenTime,
        productiveTime,
        neutralTime,
        unproductiveTime,
        mostUsedApp,
        appUsage,
        hourlyUsage,
      },
    });

  } catch (error) {
    console.error("Daily analytics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate daily analytics",
    });
  }
};


// ======================================================
// WEEKLY ANALYTICS
// GET /api/analytics/weekly
// ======================================================

exports.getWeeklyAnalytics = async (req, res) => {
  try {
    const { deviceType } = req.query;

    // ------------------------------------------
    // Get last 7 days
    // ------------------------------------------

    const endDate = new Date();

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);

    const query = {
      userId: req.user.id,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    };

    // Optional device filter
    if (deviceType) {
      query.deviceType = deviceType;
    }

    const usage = await Usage.find(query);

    // ------------------------------------------
    // Create 7-day structure
    // ------------------------------------------

    const days = {};

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const key = date.toISOString().split("T")[0];

      days[key] = {
        date: key,
        totalScreenTime: 0,
        productiveTime: 0,
        neutralTime: 0,
        unproductiveTime: 0,
      };
    }

    // ------------------------------------------
    // Add usage to each day
    // ------------------------------------------

    usage.forEach((record) => {
      const key = new Date(record.date)
        .toISOString()
        .split("T")[0];

      if (!days[key]) return;

      days[key].totalScreenTime += record.totalTime;

      if (record.category === "productive") {
        days[key].productiveTime += record.totalTime;
      } else if (record.category === "unproductive") {
        days[key].unproductiveTime += record.totalTime;
      } else {
        days[key].neutralTime += record.totalTime;
      }
    });

    const weeklyData = Object.values(days);

    // ------------------------------------------
    // Weekly total
    // ------------------------------------------

    const weeklyTotal = weeklyData.reduce(
      (sum, day) => sum + day.totalScreenTime,
      0
    );

    return res.status(200).json({
      success: true,

      period: {
        start: startDate,
        end: endDate,
      },

      weeklyTotal,

      days: weeklyData,
    });

  } catch (error) {
    console.error("Weekly analytics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate weekly analytics",
    });
  }
};
