const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  }, 
  last_name: {
    type: String,
    required: true
  },
  profile_type: {
    type: String,
    enum: ['Prophetic', 'Default', 'Partner', 'Sons/Daughters', 'Dev','Evangelism', 'NewBorn', 'Ministers'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  }, 
  referral: {
    type: String,
    required: false
  },
  phone:{
    type: String,
    required: false,
    unique: true
  }
});

module.exports = mongoose.model('User', userSchema);
