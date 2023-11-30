import dotenv from "dotenv";
import express from "express"
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import commentRoutes from "./routes/comments.js";
import videoRoutes from "./routes/videos.js";
import authoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";





const app = express()

dotenv.config();            // to configure your env file and let this file know about it


const connect = () => {
    
    mongoose.connect(process.env.MONGOKEY).then( () => {
        console.log("Connected to DB");
    }).catch((err) => {
        throw err;
    })
}

app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";

    return res.status(status).json({
        success: false,
         status,
         message,
    })
})


app.listen(8800, ()=>{
    connect()
    console.log("Listening on Port: 8800");
})






// MONGOKEY = "mongodb+srv://lakshya1310:<password>@cluster0.ltgfwxt.mongodb.net/?retryWrites=true&w=majority"