import { createError } from '../errors.js';
import Video from '../models/Video.js'
import User from '../models/User.js'

// add video
export const addVideo = async(req,res,next) =>{
    const newVideo = new Video({
        userId: req.user.id, ...req.body})
        try {
            const savedVideo = await newVideo.save();
            res.status(200).json(savedVideo);
        } catch (error) {
            next(error)
        }
}

// update video
export const updateVideo = async(req,res,next) =>{
    try {
        const video = await Video.findById(req.params.id);
        if(!video) return next(createError(404,"Video not found!"))
        if(req.user.id === video.userId ){
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },  {new: true});
            res.status(200).json(updatedVideo)
        }else{
            return next(createError(403, "You can update only your video!"));
        }
    } catch (error) {
        next(error)
    }
}

// delete video
export const deleteVideo = async(req,res,next) =>{
    try {
        const video = await Video.findById(req.params.id);
        if(!video) return next(createError(404,"Video not found!"))
        if(req.user.id === video.userId ){
             await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("The video has been deleted!")
        }else{
            return next(createError(403, "You can delete only your video!"));
        }
    } catch (error) {
        next(error)
    }
}

// get  videos
export const getVideo = async(req,res,next) =>{
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (error) {
        next(error)
    }
}

// add view
export const addView = async(req,res,next) =>{
    try {
        await Video.findById(req.params.id,{
            $inc: { views: 1}
        })
        res.status(200).json("The view has been increased!")
    } catch (error) {
        next(error)
    }
}
export const random = async(req,res,next) =>{
    try {
        const videos = await Video.aggregate([{ $sample: {size: 4}}]);
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}
export const trend = async(req,res,next) =>{
    try {
        const videos = await Video.find().sort({views: -1})          // if you say 1 it will give video with least views and if -1 will give most views
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}
export const sub = async(req,res,next) =>{
    try {
        
        const user = await User.findById(req.user.id);
        const subscribedChannel = user.subscribedUsers;
        
      const list = await Promise.all(
            subscribedChannel.map( async (channelId) =>{
                return await Video.find({userId: channelId})
            })
            );
            /** ## GETTING MORE THAN ONE SUBBED SAME CHANNELS FILTER IN CHECK API GET SUBSCRIBED VIDEO */
            let map = new Map();
            let ans = [];
            list.forEach((item, index) => {
                // if(item.userId > 1)
                // console.log("map => " + (item[0]['userId'])); 
                if( !map.has(item[0]['userId'] )){
                    ans.push(item)
                    map.set(item[0]['userId']);
                }
            });
                res.status(200).json(ans.flat().sort((a,b) => b.createdAt - a.createdAt))
            } catch (error) {
                next(error)
            }
        }
        
export const getByTag = async(req,res,next) =>{
    const tags = req.query.tags.split(",")
    console.log(tags);
    try {
        const videos = await Video.find({tags: {$in: tags}}).limit(20)        
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}
export const search = async(req,res,next) =>{
    const query = req.query.q
    try {
        const videos = await Video.find({title: {$regex: query, $options: "i"}}).limit(40)          
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}
        