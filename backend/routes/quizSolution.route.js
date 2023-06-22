const express = require('express');
const router = express.Router();
const {getQuizSolutionByName , getAllQuizzesSolutions} = require('../controllers/quizSolution.controller');

router.get('/:quizTitle', getQuizSolutionByName);
router.get('/',getAllQuizzesSolutions)

module.exports = router;
