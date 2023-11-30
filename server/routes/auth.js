import express from 'express'
import { signin, signup } from '../controllers/auth.js';


const router = express.Router();

// CREATE USER
router.post("/signup", signup)

// SIGN IN USER
router.post("/signin",signin)

// GOOGLE AUTH USER
router.get("/google", )


export default router;

 // I AM AT 22:34