const express = require("express");
const { getQuiz, getQuizzes } = require("../controllers/quiz.controller.js");

const router = express.Router();

router.get("/:title", getQuiz);
router.get("/", getQuizzes)
// router.put("/", updateUser);

module.exports = router;