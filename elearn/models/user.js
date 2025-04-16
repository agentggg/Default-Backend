const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
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
    enum: ['private', 'common', 'prophet'],
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
