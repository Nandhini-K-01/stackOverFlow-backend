const mongo = require("../connect");
const {ObjectId} = require("mongodb");

module.exports.getQuestions = async (req,res) => {
    try{
        const questions = await mongo.selectedDb.collection("questions").find().toArray();
        res.send(questions);
        console.log(questions)
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports.getQuestionById = async (req,res) => {
    try{
        const question = await mongo.selectedDb.collection("questions").findOne({_id: ObjectId(req.params.id)});
        res.send(question);
        console.log(question)
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports.createQuestion = async (req,res) => {
    try{
        const createdQuestion = await mongo.selectedDb.collection("questions").insertOne({...req.body});
        res.send(createdQuestion);
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports.updateById = async (req,res) => {
    try{
        const insertAnswer = await mongo.selectedDb.collection("questions").findOneAndUpdate(
            {_id: ObjectId(req.params.id)}, {$push:{answerDetails: req.body.answerDetails}}, {returnDocument:"after"});
            res.send(insertAnswer);
    }
    catch(err){
    console.log(err);
    res.status(500).send(err);
    }
}