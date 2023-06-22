const express = require('express');
const router = express.Router();
const {getQuizSolutionByName , getAllQuizzesSolutions} = require('../controllers/quizSolution.controller');
const authenticate = require('../middleware/authenticate')

router.get('/:quizTitle', authenticate,getQuizSolutionByName);
router.get('/',authenticate,getAllQuizzesSolutions)

module.exports = router;
