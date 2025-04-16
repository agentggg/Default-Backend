const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  visitedAt: {
    type: Date,
    default: Date.now
  },
  duration: Number, // in seconds
  userAgent: String,
  screen: String,
  timezone: String,
  language: String,
  platform: String,
  deviceMemory: String,
  ip: String,
  city: String,
  region: String,
  country: String,
  org: String
});

module.exports = mongoose.model('Analytics', analyticsSchema);
