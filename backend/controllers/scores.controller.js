const User = require("../models/user.model");

//get every score from a specific quiz
const getScoresByQuizTitle = async (req,res) => {
    try {
        const {quizTitle} = req.params;

        const users = await User.find();

        const scores = []

        users.map((user, index)=>{user.scores.map((score, index)=>{
            if(score.quizTitle==quizTitle) {
                const s = {
                    username: user.username,
                    score: score.score
                }
                scores.push(s);
            }
        })})

        scores.sort((a, b) => b.score - a.score);

        res.json(scores)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error fetching scores"})
    }
}

module.exports = {
    getScoresByQuizTitle,
  }