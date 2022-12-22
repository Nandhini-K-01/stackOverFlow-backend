const mongo = require("../connect");

module.exports.postComment = async (req,res) => {
    try{
        const postedComment = await mongo.selectedDb.collection("questions").insertOne({...req.body});
        res.send(postedComment);
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}