import dotenv from "dotenv"
dotenv.config()

import express from "express"

import cors from "cors"

import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import cookieParser from "cookie-parser"

import { connectDB } from "./configurations/connectDb.js"
import journalRoutes from "./routes/journalRoutes.js"
import { log } from "console"
const app=express()
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use('/api/journal',journalRoutes)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  });
}


connectDB().then(()=>{
app.listen(process.env.PORT,()=>{
console.log(`🚀 server is running on port ${process.env.PORT}`);

})
})
