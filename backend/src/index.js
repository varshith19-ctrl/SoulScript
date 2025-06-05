import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import { connectDB } from "./configurations/connectDb.js"
import journalRoutes from "./routes/journalRoutes.js"
const app=express()
app.use(cors({
    origin:"https://localhost:5173"
}))
app.use(express.json())
app.use('/api/journal',journalRoutes)
connectDB().then(()=>{
app.listen(process.env.PORT,()=>{
console.log(`🚀 server is running on port ${process.env.PORT}`);

})
})
