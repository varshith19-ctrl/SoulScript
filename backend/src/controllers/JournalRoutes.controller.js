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
        secure:false, 
        sameSite:"Lax",
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
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,      
    sameSite: "None",  
  }).json({ message: "Logged out" });
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

  "What emotion dominated your day and why?",
  "What’s been weighing on your mind lately?",
  "What do you need more of in your life right now?",
  "What did you avoid doing today, and why?",
  "What’s one thing you're currently overthinking?",
  "If your mind were a weather report, what would it be today?",
  "What’s a small win you had today?",
  "What’s one thing you learned about yourself this week?",

  "Who is someone you're thankful for, and why?",
  "What’s something ordinary that brings you joy?",
  "Write about a memory that always makes you smile.",
  "What’s something you're looking forward to?",
  "What’s a kind thing someone did for you recently?",
  "What’s one thing you love about yourself today?",
  "Write about a time you felt truly at peace.",

  "What’s a recent mistake that taught you something valuable?",
  "What advice would you give to your past self?",
  "What limiting belief are you trying to let go of?",
  "How have you grown in the last 6 months?",
  "What’s one habit you'd like to break, and why?",
  "What’s something you used to worry about that no longer affects you?",

  "If you could spend today doing anything, what would it be?",
  "Describe your ideal day from start to finish.",
  "If your life were a movie, what scene would today be?",
  "If you could talk to your inner child, what would you say?",
  "Write a letter from your future self to you now.",

  "Who do you wish you could reconnect with, and why?",
  "What does love mean to you right now?",
  "How do you show up for the people you care about?",
  "What kind of support do you need most right now?"
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

export const readingUserPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user posts" });
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

export const deletePost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    // Optional: Secure check if you want it
    // if (post.user.toString() !== req.userId) {
    //   return res.status(403).json({ msg: 'Not authorized to delete this post' });
    // }

    await CommunityPost.findByIdAndDelete(req.params.id); // ✅ better than post.remove()
    res.json({ msg: 'Post deleted' });
  } catch (err) {
    console.error("Delete Post Error:", err);
    res.status(500).send('Server Error');
  }
};

