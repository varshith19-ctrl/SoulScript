import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
dotenv.config()
import { connectDB } from "./configurations/connectDb.js"
import journalRoutes from "./routes/journalRoutes.js"
const app=express()
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use('/api/journal',journalRoutes)
connectDB().then(()=>{
app.listen(process.env.PORT,()=>{
console.log(`🚀 server is running on port ${process.env.PORT}`);

})
})
