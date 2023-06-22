const QuizSolution = require('../models/solution.model');

const verifyAnswers = async (req, res) => {
  try {
    const { title, answers } = req.body;

    const solution = await QuizSolution.findOne({ quizTitle: title });
    if (!solution) {
      return res.status(404).json({ message: "No solution found for this quiz title" });
    }
    const correctAnswers = solution.solutions;
    const result = correctAnswers.map((sol, index) => {
      if (Array.isArray(sol) && Array.isArray(answers[index])) {
          return {
              question: index + 1,
              correct: JSON.stringify(sol.sort()) === JSON.stringify(answers[index].sort())
          };
      }
      return {
          question: index + 1,
          correct: sol === answers[index]
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