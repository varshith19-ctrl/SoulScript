import mongoose from "mongoose";

export const connectDB=async ()=>{
    try {
       const connection= await mongoose.connect(process.env.MONGO_URI);
        console.log(`DataBase connected successfully`);
        
    } catch (error) {
        console.log(`an error occured while connecting to the dataBase ${error}`);
        
    }
} 