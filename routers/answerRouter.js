const express = require("express");
const answerModule = require("../models/answerModule");

const router = express.Router();

router.post("/create", answerModule.createAnswer );

module.exports = router;