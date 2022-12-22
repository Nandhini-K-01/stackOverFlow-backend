const express = require("express");
const questionModule = require("../models/questionModule");

const router = express.Router();

router.get("/get", questionModule.getQuestions);
router.get("/get/:id", questionModule.getQuestionById);
router.put("/put/:id", questionModule.updateById);
router.post("/create", questionModule.createQuestion);

module.exports = router;