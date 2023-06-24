const express = require('express');
const router = express.Router();
const {getScoresByQuizTitle} = require('../controllers/scores.controller');
const authenticate = require('../middleware/authenticate')

router.get('/:quizTitle', authenticate,getScoresByQuizTitle);

module.exports = router;
