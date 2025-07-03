import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      required: true,
    },
    aiTone: {
      type: String,
    },
     user: {
      type: mongoose.Schema.Types.ObjectId,  
      ref: 'User',                           
      required: true,                        
    }
  },
  { timestamps: true }
);
const JournalEntryDB=mongoose.model("JournalEntry", journalSchema);

export default JournalEntryDB
