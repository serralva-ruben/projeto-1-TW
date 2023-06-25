const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  questions: [{
    questionText: {
      type: String,
      required: true
    },
    questionType: {
      type: String,
      required: true
    },
    questionPoints: {
      type: Number,
      required: true
    },
    answerOptions: [{
      answerText: {
        type: String,
        required: true
      },
    }]
  }]
});

module.exports = mongoose.model('Quiz', QuizSchema);
