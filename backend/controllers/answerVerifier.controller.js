const QuizSolution = require('../models/solution.model');

const verifyAnswers = async (req, res) => {
  try {
    const { title, answers } = req.body;

    const solution = await QuizSolution.findOne({ quizTitle: title });
    console.log(solution)
    if (!solution) {
      return res.status(404).json({ message: "No solution found for this quiz title" });
    }
    console.log(solution)
    const correctAnswers = solution.solutions;
    console.log(correctAnswers)
    const result = correctAnswers.map((answer, index) => {
      return {
        question: index + 1,
        correct: answer === answers[index]
      };
    });

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  verifyAnswers
}