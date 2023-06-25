const express = require('express');
const router = express.Router();
const {getScoresByQuizTitle, getBestScoresByQuizTitle} = require('../controllers/scores.controller');
const authenticate = require('../middleware/authenticate')

router.get('/:quizTitle', authenticate,getScoresByQuizTitle);
router.get('/best/:quizTitle', authenticate, getBestScoresByQuizTitle);


module.exports = router;
