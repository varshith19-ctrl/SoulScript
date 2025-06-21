import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB=async ()=>{
    // const mongodb = process.env.MONGODB_URI || 
    try {
       const connection= await mongoose.connect(process.env.MONGO_URI);
        console.log(`DataBase connected successfully`);
        
    } catch (error) {
        console.log(`an error occured while connecting to the dataBase ${error}`);
        
    }
} 