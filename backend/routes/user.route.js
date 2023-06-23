const express = require("express");
const { deleteUser, getUser, updateUser, addScore } = require("../controllers/user.controller.js");
const authenticate = require('../middleware/authenticate')
const router = express.Router();

router.get("/:username",authenticate ,getUser);
router.put("/",authenticate ,updateUser);
router.delete("/:id",authenticate ,deleteUser);

module.exports = router;