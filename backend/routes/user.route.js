const express = require("express");
const { deleteUser, getUser, updateUser } = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/:id", getUser);
// router.post("/score", addScore);
router.put("/", updateUser)
router.delete("/:id", deleteUser);

module.exports = router;