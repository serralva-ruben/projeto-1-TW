const QuizSolution = require('../models/solution.model');
const User = require('../models/user.model');

const verifyAnswers = async (req, res) => {
  let scorePoints = 0

  try {
    const { title, answers, username } = req.body;

    const solution = await QuizSolution.findOne({ quizTitle: title });
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

      if(score.correct) scorePoints++

      return score
      
  });

  //update user score

  const user = await User.findOne({ username });
  console.log(username)
  console.log("user: "+user)
  if (!user) {return res.status(404).json({ message: "User not found" });}
  user.scores.push({quizTitle: title, score: scorePoints})
  try {
    await user.save();
  } catch (error) {
    console.log(error)
  }

  res.json(result);

  } 
  catch (err) {res.status(500).json({ message: err.message });}
};

module.exports = {
  verifyAnswers
}