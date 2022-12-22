const express = require("express");
const mongo = require("./connect");
const dotenv = require("dotenv");
const cors = require("cors");
const registerRouter = require("./routers/registerRouter");
const questionRouter = require("./routers/questionRouter");
const answerRouter = require("./routers/answerRouter");
const commentRouter = require("./routers/commentRouter");
const auth = require("./models/authModule");

dotenv.config();
mongo.connect();
const app = express();
app.use(cors())
app.use(express.json());
app.use("/register", registerRouter);

app.use("/",auth.authenticateUser);
app.use("/question",questionRouter);
app.use("/answer",answerRouter);
app.use("/comment",commentRouter);


const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log("Stack Overflow Clone API is running");
  });