
require("dotenv").config();
const app = require("./app");
const connectDb = require("./config/db");
const { startReminderScheduler } = require("./services/reminderService");

const PORT = process.env.PORT || 5000;

async function startServer() {
  const dbReady = await connectDb();

  if (!dbReady) {
    console.warn("MongoDB is unavailable; the server will continue to run in limited mode.");
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    if (dbReady) startReminderScheduler();
  }).on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use. Stop the other server or change PORT in server/.env`);
    } else {
      console.error(error.message);
    }
    process.exit(1);
  });
}

startServer().catch((error) => {
  console.error(error.message);
});
