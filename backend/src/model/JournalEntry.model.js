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
    }
  },
  { timestamps: true }
);
const JournalEntryDB=mongoose.model("JournalEntry", journalSchema);

export default JournalEntryDB
