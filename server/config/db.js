const mongoose = require("mongoose");

const connectDB = async ({ throwOnError = false } = {}) => {
  if (mongoose.connection.readyState === 1) {
    return true;
  }

  if (!process.env.MONGO_URI) {
    const error = new Error("MONGO_URI is missing. Add it to server/.env before starting the API.");

    if (throwOnError) {
      throw error;
    }

    console.warn(`[DB] ${error.message}`);
    return false;
  }

  const mongoUri = process.env.MONGO_URI.trim();

  if (/<[^>]+>/.test(mongoUri)) {
    const error = new Error(
      "MONGO_URI still contains placeholder text (e.g. <cluster-url>). Copy the full connection string from MongoDB Atlas → Connect → Drivers."
    );

    console.error(`[DB] ${error.message}`);

    if (throwOnError) {
      throw error;
    }

    return false;
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } 
  catch (error) {
    console.error("[DB] MongoDB connection failed:", error.message);

    if (error.message.includes("bad auth") || error.message.includes("Authentication failed")) {
      console.error("[DB] Check your MongoDB username and password in server/.env");
    } else if (error.message.includes("ENOTFOUND") || error.message.includes("querySrv")) {
      console.error("[DB] Check your cluster URL in MONGO_URI");
    } else if (error.message.includes("IP") || error.message.includes("whitelist")) {
      console.error("[DB] Add your current IP to MongoDB Atlas Network Access");
    }

    if (throwOnError) {
      throw error;
    }

    return false;
  }
};

const isConnected = () => mongoose.connection.readyState === 1;

module.exports = connectDB;
module.exports.isConnected = isConnected;
/*"success": true,
    "message": "User registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhN2FkMzNlODIwMjdhNjhlMDVkNGI0ZiIsImlhdCI6MTc4NjQzNDM2NiwiZXhwIjoxNzg3MDM5MTY2fQ.tf58qyr0jS76x249LNwb5Hd0iXrY9eiobk8dQAWIbsw",
    "user": {
        "id": "6a7ad33e82027a68e05d4b4f",
        "name": "Test User",
        "email": "testuser123@gmail.c*/