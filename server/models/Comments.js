import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    videoId: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
} , 
    { timeStamps: true }       // this will create createdAt for Videos when they get created
)



export default mongoose.model("Comments",CommentsSchema)