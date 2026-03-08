const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/notesdb";

async function connect() {
  console.log("Attempting to connect to local MongoDB...");
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully!");
    await mongoose.disconnect();
    console.log("Disconnected.");
  } catch (error) {
    console.error("Connection failed:", error.message);
  }
}

connect();

