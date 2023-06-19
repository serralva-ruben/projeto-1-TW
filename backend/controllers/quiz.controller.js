const Quiz = require("../models/quiz.model.js");


const getQuizes = async (req, res) => {
  try {
    const quizes = await Quiz.find()
    res.status(200).json(quizes)
  } catch (error) {
    res.status(500).json({ error: 'Failed to find Quizes' });
  }
};


const getQuiz = async (req, res, next) => {
  const user = await Quiz.findById(req.params.id);

  res.status(200).send(user);
};


const createQuiz = async (req, res) => {
  try {
    const { title, questions, questionType, answerOptions, isCorrect } = req.body;
    const newQuiz = await User.create({ title, questions, questionType, answerOptions, isCorrect });
    console.log(newQuiz);

    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Bus' });
  }
};

module.exports = {
  getQuizes,
  getQuiz,
  createQuiz,
}