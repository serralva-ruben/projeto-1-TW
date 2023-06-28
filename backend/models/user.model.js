const mongoose = require('mongoose');
const moment = require('moment');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  scores: [{
    quizTitle: {
      type: String,
      required: true
    },
    score: mongoose.Schema.Types.Decimal128,
    timestamp: {
      type: String,
      default: moment().format('MM/DD/YYYY, HH:mm:ss')
    }
  }]
});

module.exports = mongoose.model('User', UserSchema);
