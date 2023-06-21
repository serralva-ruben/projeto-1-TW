const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSolutionSchema = new mongoose.Schema({
    quizTitle: {
        type: String,
        required: true,
        unique: true,
    },
    solutions: {
        type: [Schema.Types.Mixed],
        required: true,
    }
});

module.exports = mongoose.model('quizzessolutions', QuizSolutionSchema);
