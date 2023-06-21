const Quiz = require("../models/quiz.model.js");


const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
    res.status(200).json(quizzes)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get Quizzes' });
  }
};

const getQuiz = async (req, res, next) => {
  const quiz = await Quiz.findOne({ title: req.params.title });
  if(!quiz) {return res.status(404).send({ message: 'Quiz not found' });}
  res.status(200).send(quiz);
};

const evaluateQuiz = async (req, res) => {
  try {
    const submittedAnswers = req.body; 
    const quizTitle = req.params.quizTitle; 
    const quizSolutions = await quizzessolutions.findOne({ title: quizTitle });
    const score = calculateScore(submittedAnswers, quizSolutions.solutions);

    res.json({ score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to evaluate quiz answers' });
  }
};


const calculateScore = (submittedAnswers, correctAnswers) => {
  let score = 0;

  for (let i = 0; i < submittedAnswers.length; i++) {
    const submittedAnswer = submittedAnswers[i];
    const correctAnswer = correctAnswers[i];

    if (Array.isArray(submittedAnswer)) {
      if (arraysMatch(submittedAnswer, correctAnswer)) {
        score += 1;
      }
    } else {
      if (submittedAnswer === correctAnswer) {
        score += 1;
      }
    }
  }

  return score;
};


const arraysMatch = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
};



module.exports = {
  getQuizzes,
  getQuiz,
  evaluateQuiz,
}