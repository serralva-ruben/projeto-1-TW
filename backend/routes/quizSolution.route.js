const express = require('express');
const router = express.Router();
const quizSolutionController = require('../controllers/quizSolution.controller');

// get solution of a quiz by its title
router.get('/:quizTitle', quizSolutionController.getQuizSolution);

module.exports = router;
