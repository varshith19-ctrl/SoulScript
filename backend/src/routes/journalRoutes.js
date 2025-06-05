import express from "express"
import { creatingEntry,readingEntry } from "../controllers/JournalRoutes.controller.js";
const router=express.Router();
router.post("/",creatingEntry)
router.get("/",readingEntry)
export default router