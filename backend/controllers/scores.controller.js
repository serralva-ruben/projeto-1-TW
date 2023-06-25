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

const getBestScoresByQuizTitle = async (req,res) => {
    try {
        const {quizTitle} = req.params;

        const users = await User.find();

        let bestScores = {};

        //filtering and only setting the best scores
        users.forEach(user => {
            user.scores.forEach(score => {
                if(score.quizTitle == quizTitle) {
                    //we set the best score found so far to the bestScores dictionnary, if we find a bigger score we replace it
                    if(!bestScores[user.username] || bestScores[user.username] < score.score) {
                        bestScores[user.username] = score.score;
                    }
                }
            });
        });
        
        //same as the method
        const scores = []

        for(let username in bestScores) {
            scores.push({
                username: username,
                score: bestScores[username]
            });
        }

        scores.sort((a, b) => b.score - a.score);

        res.json(scores)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error fetching scores"})
    }
}

module.exports = {
    getScoresByQuizTitle,
    getBestScoresByQuizTitle,
  }