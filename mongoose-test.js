const mongoose = require('mongoose');

const uri = "mongodb+srv://ayanfe123ayanfe_db_user:wmDVpZcark6OwNtf@cluster0.qghb1z7.mongodb.net/notesdb?retryWrites=true&w=majority";

async function connect() {
  console.log("Attempting to connect with Mongoose...");
  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB successfully with Mongoose!");
    await mongoose.disconnect();
    console.log("Disconnected.");
  } catch (error) {
    console.error("Connection failed:", error.message);
  }
}

connect();


