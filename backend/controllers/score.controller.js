const User = require('../models/user.model');
const Quiz = require('../models/quiz.model');

const submitScore = async (req, res) => {
    // Extract information from request body
    const { userId, quizId, score } = req.body;
    
    // Find the user in the database
    const user = await User.findById(userId);
    const quiz = await Quiz.findById(quizId);

    // Update the score
    user.scores = user.scores || {};
    user.scores[quizId] = score;

    // Save the user back to the database
    await user.save();

    // Send a response back to the client
    res.json({ message: 'Score saved successfully' });
};

module.exports = {
    submitScore,
    
  }