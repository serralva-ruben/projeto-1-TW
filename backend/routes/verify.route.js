const express = require("express");
const { verifyAnswers } = require("../controllers/answerVerifier.controller.js");
const router = express.Router();

router.post('/', verifyAnswers);

module.exports = router;