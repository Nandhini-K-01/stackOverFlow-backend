const mongo = require("../connect");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jsw = require("jsonwebtoken");


exports.signup = async (req,res,next) => {
    try {
        const validation = joi.object({
        //   username: joi.string().alphanum().min(3).max(25).trim(true).required(),
        //   Username: joi.string().alphanum().min(2).max(25).trim(true).required(),
          email: joi.string().email().trim(true).required(),
          password: joi.string().min(3).trim(true).required(),
          confirmPassword: joi.string().min(8).trim(true),
        //   role: joi.string().trim(true).required(),
        //   mobileNumber: joi
        //     .string()
        //     .length(10)
        //     .pattern(/[6-9]{1}[0-9]{9}/)
        //     .required(),
        });
    
        const { error } = validation.validate(req.body);
        if (error) {
          return res.status(400).send({ msg: error.message });
        }

        //EmailId validation
        const existUser = await mongo.selectedDb.collection("users").findOne({email: req.body.email});
        if(existUser){
            return res.status(400).send({msg: "You are already a registered user."})
        }

        //Password checking 
        // const issamePassword = checkPassword(req.body.password, req.body.confirmPassword)
        //     if(!issamePassword){
        //         return res.status(400).send({msg: "Your passwords doesn't match"})
        //     } else{
        //         delete req.body.confirmPassword;
        //     } 
        
        //Password hashing
        const randomString = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, randomString);

        //Save in DB
        const insertedResponse = await mongo.selectedDb.collection("users").insertOne({...req.body});
        res.send(insertedResponse);

    } catch (err){
        console.log(err);
        res.status(500).send(err)
    }
}

     
        // const checkPassword = (password,confirmPassword) => {
        //     return password === confirmPassword ? true : false;
        // }

exports.signin = async (req,res,next) => {
    const existUser = await mongo.selectedDb.collection("users").findOne({email: req.body.email});
    if(!existUser){
        return res.status(400).send({msg: "You are not a registered user"})
    }

    //Password checking
    const isSamePassword = await bcrypt.compare(req.body.password, existUser.password);

    if(!isSamePassword){
        return res.status(400).send({msg: "Your password is incorrect"});
    }

    //Generate jsw token
    const token = jsw.sign(existUser, process.env.SECRET_KEY, {expiresIn:"1hr"});
    res.send(token);
}