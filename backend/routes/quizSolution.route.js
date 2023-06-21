const express = require('express');
const router = express.Router();
const {getQuizSolution} = require('../controllers/quizSolution.controller');

// get solution of a quiz by its title
router.get('/:quizTitle', getQuizSolution);

module.exports = router;
