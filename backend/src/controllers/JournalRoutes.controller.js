import { analyzeTone } from "../AI/tone.js";
import JournalEntryDB  from "../model/JournalEntry.model.js"
export const creatingEntry=async (req,res)=>{
const {text,mood}=req.body;
try {
    const aiTone = await analyzeTone(text);
    const newEntry = new JournalEntryDB({ text, mood, aiTone });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch(error){
    console.log(error);
    res.status(500).json({error:"error saving journal entry"})
    
  }
}

export const readingEntry=async (req,res)=>{
 try {
    const entries = await JournalEntryDB.find().sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching entries' });
  }
}