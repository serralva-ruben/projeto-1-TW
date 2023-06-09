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


module.exports = {
  getQuizzes,
  getQuiz,
}