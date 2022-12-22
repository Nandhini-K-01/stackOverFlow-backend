const mongo = require("../connect");
// const {ObjectId} = require("mongodb");

module.exports.createAnswer = async (req,res) => {
    try{
        const createdAnswer = await mongo.selectedDb.collection("answers").insertOne({...req.body});
        res.send(createdAnswer);
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}