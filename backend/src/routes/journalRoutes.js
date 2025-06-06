import express from "express"
import {verifyToken} from "../middlware/auth.middleware.js"
import { creatingEntry,readingEntry ,registerUser,loginUser, logout, deletebyID} from "../controllers/JournalRoutes.controller.js";
const router=express.Router();
router.post("/",verifyToken,creatingEntry)
router.get("/",verifyToken,readingEntry)
router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",logout)
router.delete("/:id",deletebyID)
export default router