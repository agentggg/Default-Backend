const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  cardIndex: Number,
  feedback: {
    type: String,
    enum: ['like', 'dislike', 'neutral'],
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
