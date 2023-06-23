const express = require("express");
const { verifyAnswers } = require("../controllers/answerVerifier.controller.js");
const router = express.Router();
const authenticate = require('../middleware/authenticate')

router.post('/',authenticate, verifyAnswers);

module.exports = router;