import express from "express"
import {verifyToken} from "../middlware/auth.middleware.js"
import { creatingEntry,readingEntry ,registerUser,loginUser, logout, deletebyID, questionPrompts, readingPost, createPost, deletePost} from "../controllers/JournalRoutes.controller.js";
const router=express.Router();
router.post("/",verifyToken,creatingEntry)
router.get("/",verifyToken,readingEntry)
router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",logout)
router.delete("/:id",deletebyID)
router.get('/checkAuth', verifyToken, (req, res) => {
  res.json({ user: req.user }); // req.user is set by your auth middleware
});
router.get("/prompt",verifyToken,questionPrompts)
router.get("/readpost",verifyToken,readingPost)
router.post("/createpost",verifyToken,createPost)
router.delete("/deletepost/:id",verifyToken,deletePost)
export default router