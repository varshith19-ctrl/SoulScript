import { analyzeTone } from "../AI/tone.js";
import JournalEntryDB from "../model/JournalEntry.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/User.model.js";
import CommunityPost from "../model/CommunityPost.model.js";
const JWT_SECRET = process.env.JWT_SECRET || "secret123";
export const creatingEntry = async (req, res) => {
  const { text, mood } = req.body;
  try {
    const aiTone = await analyzeTone(text);
    const newEntry = new JournalEntryDB({
      text,
      mood,
      aiTone,
      user: req.userId,
    });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error saving journal entry" });
  }
};

export const readingEntry = async (req, res) => {
  try {
    const entries = await JournalEntryDB.find({ user: req.userId });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Error fetching entries" });
  }
};

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.status(201).json({ token, user: { username, email } });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Registration failed", details: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // 👈 true in production
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        message: "Logged in successfully",
        user: { username: user.username, email },
      });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
};

export const deletebyID = async (req, res) => {
  try {
    const entry = await JournalEntryDB.findById(req.params.id);
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    if (entry.user.toString() !== req.userId) {
      return res.status(403).json({ error: "Not allowed" });
    }

    await entry.deleteOne();
    res.json({ message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const questionPrompts = async (req, res) => {
  const prompts = [
    "What are you grateful for today?",
    "Describe a moment today that made you smile.",
    "What challenges are you facing lately?",
    "How are you really feeling right now?",
    "What is something you’re proud of this week?",
    "Write a letter to your future self.",
    "If today was a color, what would it be and why?",
  ];
  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  res.json({ prompt: randomPrompt });
};

export const readingPost = async (req, res) => {
  try {
    const posts = await CommunityPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

export const createPost=async (req,res) => {
    try {
    const { text  } = req.body;
     console.log("Received text:", text);
    console.log("Authenticated user:", req.user);
    if (!text) return res.status(400).json({ msg: 'Text is required' });

    const newPost = new CommunityPost({ text ,user: req.user._id});
    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    console.log("entered here ");
    
    res.status(500).send('Server Error');
  }
}


export const deletePost=async (req,res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to delete this post' });
    }

    await post.remove();
    res.json({ msg: 'Post deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
}