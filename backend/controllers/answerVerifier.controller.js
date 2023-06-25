const QuizSolution = require('../models/solution.model');
const Quiz = require('../models/quiz.model');
const User = require('../models/user.model');

const verifyAnswers = async (req, res) => {
  let scorePoints = 0

  try {
    const { title, answers, username } = req.body;

    const solution = await QuizSolution.findOne({ quizTitle: title });
    const quiz = await Quiz.findOne({title: title})
    if (!solution) return res.status(404).json({ message: "No solution found for this quiz title" });
    
    const correctAnswers = solution.solutions;

    //calculate score
    const result = correctAnswers.map((sol, index) => {
      let answer = answers[index]

      let score = {
        question: index + 1,
        correct: false
      }

      if (Array.isArray(sol) && Array.isArray(answer)) score.correct = JSON.stringify(sol.sort()) === JSON.stringify(answer.sort())

      else score.correct = sol === answer

      if(score.correct) scorePoints += quiz.questions[index].questionPoints

      console.log("points : "+scorePoints)

      return score
      
  });

  //update user score

  const user = await User.findOne({ username });

  if (!user) {return res.status(404).json({ message: "User not found" });}

  let totalPoints = 0;
  quiz.questions.map((question)=>{
    totalPoints += question.questionPoints;
  })

  user.scores.push({quizTitle: title, score: (scorePoints/totalPoints)})
  
  try {
    await user.save();
  } catch (error) {
    console.log(error)
  }

  res.json(result);

  } 
  catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });}
};

module.exports = {
  verifyAnswers
}