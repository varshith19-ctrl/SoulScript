import express from "express";
import { verifyToken } from "../middlware/auth.middleware.js";
import {
  creatingEntry,
  readingEntry,
  registerUser,
  loginUser,
  logout,
  deletebyID,
  questionPrompts,
  readingPost,
  createPost,
  readingUserPosts,
  deletePost
} from "../controllers/JournalRoutes.controller.js";

const router = express.Router();

//  Authentication Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.get("/checkAuth", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

//  Journal Entry Routes
router.post("/", verifyToken, creatingEntry);
router.get("/", verifyToken, readingEntry);
router.delete("/:id", verifyToken,deletebyID);

//  Prompt Route
router.get("/prompt", verifyToken, questionPrompts);

//  Community Post Routes
router.get("/readpost", verifyToken, readingPost);
router.get("/readuserposts", verifyToken, readingUserPosts);

router.post("/createpost", verifyToken, createPost);
router.delete("/deletepost/:id", verifyToken, deletePost);

export default router;
