const QuizSolution = require('../models/solution.model');

exports.getQuizSolution = async (req, res) => {
    try {
        const quizTitle = req.params.title;

        const solution = await QuizSolution.findOne({ quizTitle: quizTitle });

        if (!solution) {
            return res.status(404).json({ message: "No solution found for this quiz title" });
        }

        res.json(solution);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
