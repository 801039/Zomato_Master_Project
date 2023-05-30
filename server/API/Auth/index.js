//Library
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Models
import { UserModel } from "../../database/user";

const Router = express.Router();

/*
Route```/signup
Des     sign with email and password
Params  none
Access  Public
Mwthod  Post
*/
Router.post("/signup", async(req,res)=>{
    try{
        const {email, password, fullname, phoneNumber} = req.body.credentials;

        //Check whether email and phone number exists
        const checkUserByEmail = await UserModel.findOne({email});
        const checkUserByPhone = await UserModel.findOne({phoneNumber});

        if(checkUserByEmail || checkUserByPhone){
            return res.json({error:"User already exists!!!"}); 
        }

        //Hash the password using bcryptjs => genSalt(8) = encrypt password 8*
        const bcryptSalt = await bcrypt.genSalt(8);

        const hashedPassword = await bcrypt.hash(password, bcryptSalt);

        //Save to DB
        await UserModel.create({
            ...req.body.credentials, 
            password: hashedPassword,
        });

        //Generate JWT token 
        const token = jwt.sign({user: {fullname, email}}, "ZomatoAPP");


    //return
    return res.status(200).json({token, status: "success"});
    } catch(error){
        return res.status(500).json({error: error.message});
    }
});
    
export default Router;