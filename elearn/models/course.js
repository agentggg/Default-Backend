const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  cards: { 
    type: Array,
    required: true
  },
  profile_type: {
    type: String,
    enum: ['Prophetic', 'Default', 'Partner', 'Sons/Daughters', 'Dev','Evangelism', 'NewBorn', 'Ministers', 'Marketing'], 
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  name_identifier:{
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Course', courseSchema); 