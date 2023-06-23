const express = require("express");
const { getQuiz, getQuizzes, evaluateQuiz } = require("../controllers/quiz.controller.js");
const authenticate = require('../middleware/authenticate')
const router = express.Router();

router.get("/:title",authenticate, getQuiz);
router.get("/", authenticate,getQuizzes);

module.exports = router;