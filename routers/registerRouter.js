const express = require("express");
const registerModule = require("../models/registerModule");

const router = express.Router();

router.post("/signup", registerModule.signup);
router.post("/signin", registerModule.signin);

module.exports = router;