const jwt = require("jsonwebtoken")

exports.authenticateUser = (req,res,next) => {
    if(!req.headers.accesstoken){
        res.status(400).send({msg: "Token not found"})
    }

    try{
        const user = jwt.verify(req.headers.accesstoken, process.env.SECRET_KEY);
        req.body.currentuser = user;
        next();
    }catch(err){
        console.log(err);
        res.status(500).send({msg:"Unauthorised"})
    }
}