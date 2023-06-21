const express = require("express");
const { getQuiz, getQuizzes, evaluateQuiz } = require("../controllers/quiz.controller.js");

const router = express.Router();

router.get("/:title", getQuiz);
router.get("/", getQuizzes)
// router.put("/", updateUser);
router.post("/submit", evaluateQuiz)

module.exports = router;