const express = require("express");
const { deleteUser, getUser, updateUser, addScore } = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/:id", getUser);
router.put("/", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;