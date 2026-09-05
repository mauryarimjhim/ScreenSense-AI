require("dotenv").config();

const connectDb = require("../config/db");
const Usage = require("../models/Usage");

async function migrateUsageIndex() {
  await connectDb({ throwOnError: true });

  try {
    await Usage.collection.dropIndex("deviceId_1_idempotencyKey_1");
    console.log("Removed the legacy usage idempotency index.");
  } catch (error) {
    // IndexNotFound means this database is new, so there is nothing to repair.
    if (error.code !== 27) throw error;
  }

  await Usage.collection.createIndex(
    { deviceId: 1, idempotencyKey: 1 },
    {
      name: "deviceId_1_idempotencyKey_1",
      unique: true,
      partialFilterExpression: {
        deviceId: { $type: "objectId" },
        idempotencyKey: { $type: "string" },
      },
    }
  );

  console.log("Created the corrected usage idempotency index.");
  await Usage.db.close();
}

migrateUsageIndex().catch((error) => {
  console.error("Usage index migration failed:", error.message);
  process.exitCode = 1;
});
