const express = require("express");
const commentModule = require("../models/answerModule");

const router = express.Router();

router.post("/create", commentModule.createAnswer );

module.exports = router;