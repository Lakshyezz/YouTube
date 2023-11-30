import express from 'express'
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, updateUser } from '../controllers/user.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// update user
router.put("/:id", verifyToken, updateUser)

// delete user
router.delete("/:id",verifyToken, deleteUser)

// get a user
router.get("/find/:id",getUser)

// subscribe a use
router.put("/sub/:id",verifyToken,subscribe) // id will be of the channel user subscribed too

// unsubscribe a use
router.put("/unsub/:id",verifyToken,unsubscribe) // same here with id as above

// like a video
router.put("/like/:videoId", verifyToken,like)

// dislike a video
router.put("/dislike/:videoId",verifyToken, dislike)




export default router;