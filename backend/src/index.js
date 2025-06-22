import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cookieParser from "cookie-parser";

import { connectDB } from "./configurations/connectDb.js";
import journalRoutes from "./routes/journalRoutes.js";

const app = express();

// Middleware
app.use(cookieParser());

// ✅ Replace with your actual Vercel frontend URL
app.use(cors({
  origin: "https://mental-health-journal-pi.vercel.app/", // <- Replace with real Vercel domain
  credentials: true,
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Optional: Serve static files if you have image uploads, etc.
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes
app.use('/api/journal', journalRoutes);

// ✅ DO NOT serve frontend from here — Vercel handles that

// Connect to DB and start server
connectDB().then(() => {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
});
