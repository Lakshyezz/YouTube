import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from '../models/User.js';
import { createError } from '../errors.js';
import jwt from 'jsonwebtoken';



export const signup = async(req, res, next) =>{
    try {
        const salt = bcrypt.genSaltSync(10);    // generating salt
        const hash = bcrypt.hashSync(req.body.password, salt)   // adding it to password string
        const newUser = new User({ ...req.body, password: hash}) // replacing origin one with same
        await newUser.save();
        res.status(200).send("User has been created! ")
    } catch (error) {
        next(error) 
    }
}
export const signin = async(req, res, next) =>{
    try {
       const user = await User.findOne({ name: req.body.name }); // in this we are finding the user from its name as written in object
       if(!user) return next(createError(404,"User not found!"));
       
       const  isCorrect = await bcrypt.compare(req.body.password, user.password)   //  bcrypt comparing password with the user in db
       if(!isCorrect) return next(createError(400,"Wrong Credentials!"));

       // Everything OK add jwt to the userid
       const token = jwt.sign({id: user._id},process.env.JWT)
    //    console.log("token => " + token);
       const { password, ...others} = user._doc
       
       res.cookie("access_token", token, {
        httpOnly: true
       }).status(200).json(others)
    } catch (error) {
        next(error) 
    }
};


export const googleAuth = async (req, res, next) => {
    try {   
        console.log('here 1');
        const user = await User.findOne({email: req.body.email});
        
        // console.log('here 2');
        if(user){
            const token = jwt.sign({ id: user._id }, process.env.JWT);
            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(user._doc)
            // console.log('here 3');
        }else{
            console.log('here 4');
            const newUser = new User({
                ...req.body,
                fromGoogle : true,
            });
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
            res.cookie("access_token", token, {
                httpOnly: true
               }).status(200).json(savedUser._doc);
        } 

    } catch (error) {
        next(error);
    }
};


// token = "xyz"