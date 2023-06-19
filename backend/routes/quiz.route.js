const express = require("express");
const { getQuiz, getQuizes } = require("../controllers/quiz.controller.js");

const router = express.Router();

router.get("/:id", getQuiz);
router.get("/", getQuizes)
// router.put("/", updateUser);

module.exports = router;