const express = require('express');
const mongoose = require('mongoose');
const app = express();
const elearn = require('./elearn/routes');
const cors = require('cors');
require('dotenv').config();

app.use(cors())
app.use(express.json());
app.use('/elearn', elearn);

const MONGO_URI = "mongodb+srv://agentofgod75:ilaNgrCzsEy6fKab@default-backend.wepvwm0.mongodb.net/elearn_db?retryWrites=true&w=majority";
async function startServer() { 
  try { 
    console.log('📡 Connecting to:', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected via Mongoose');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB. Shutting down...');
    console.error(err);
    process.exit(1);
  }
}
startServer();