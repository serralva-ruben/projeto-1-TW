const mongoose = require('mongoose');

const QuizSolutionSchema = new mongoose.Schema({
    quizTitle: {
        type: String,
        required: true,
        unique: true,
    },
    solutions: {
        type: [String], // assuming solutions are strings, adjust as necessary
        required: true,
    }
});

module.exports = mongoose.model('quizzessolutions', QuizSolutionSchema);
