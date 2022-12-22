const {MongoClient} = require("mongodb")

module.exports={
    selectedDb:{},
 async connect(){
    try{
        const client = await MongoClient.connect(process.env.MONGO_URL);
        this.selectedDb = client.db("stackoverflow")
    }catch(err){
        console.log(err);
    }
 }
}