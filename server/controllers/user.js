import { createError } from "../errors.js"
import User from "../models/User.js"
import Video from "../models/Video.js"

// update user
export const updateUser = async (req, res, next) =>{
    // console.log("req.user.id =>" + req.user.id);
    if(req.params.id === req.user.id){
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },{new: true})
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    }else{
        return next(createError(403, "You can update only your account!"))
    }
}

// delete user
export const deleteUser = async(req, res, next) =>{
    if(req.params.id === req.user.id){
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json(" User has been deleted.")
        } catch (error) {
            next(error)
        }
    }else{
        return next(createError(403, "You can delete only your account!"))
    }
}

// get user
export const getUser = async(req, res, next) =>{
    try {
        
             
        const user = await User.findById(req.params.id)
        // console.log("user => " + JSON.stringify(user));
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

// subscribe
export const subscribe = async(req, res, next) =>{
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id}
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: 1}
        });
        console.log("IN SUB FUNCTION BACKEND");
        res.status(200).json("Subscribed successfully!")
    } catch (error) {
        next(error);
    }
}

//unsubscribe
export const unsubscribe = async(req, res, next) =>{
    // console.log("req" + JSON.stringify(req));
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id}
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: -1}
        });
        res.status(200).json("Unsubscribed!")
    } catch (error) {
        next(error)
        
    }
}

// like video
export const like = async(req, res, next) => {
    // console.log("req => " + JSON.stringify(req));
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
                    $addToSet: {likes: id},
                    $pull: {dislikes: id},
        });
        res.status(200).json("The video has been liked.")
    } catch (error) {
        next(error)
    }
}

// dislike video
export const dislike = async(req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId
    try {
        await Video.findByIdAndUpdate(videoId, {
                    $addToSet: {dislikes: id},
                    $pull: {likes: id},
        });
        res.status(200).json("The video has been disliked.")
    } catch (error) {
        next(error)
    }
}




