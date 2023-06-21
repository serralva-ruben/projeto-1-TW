const express = require('express');
const router = express.Router();
const {getQuizSolutionByName , getAllQuizzesSolutions} = require('../controllers/quizSolution.controller');

// get solution of a quiz by its title
router.get('/:quizTitle', getQuizSolutionByName);
router.get('/',getAllQuizzesSolutions)

module.exports = router;
