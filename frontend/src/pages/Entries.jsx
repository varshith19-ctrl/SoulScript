import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import JournalList from "../components/JournalList";
import MoodChart from "../components/Moodchart";

const moods = [
  "All",
  "depressed",
  "sad",
  "anxious",
  "angry",
  "confused",
  "tired",
  "bored",
  "neutral",
  "calm",
  "okay",
  "content",
  "grateful",
  "relaxed",
  "motivated",
  "focused",
  "excited",
  "hopeful",
  "happy",
  "cheerful",
  "joyful",
  "inspired",
  "lonely"
];

export default function Entries({ entries, setShowNavbar, setEntries }) {
  const [filteredMood, setFilteredMood] = useState("All");

  useEffect(() => {
    setShowNavbar(false);
    return () => setShowNavbar(true);
  }, []);

  // Filter entries directly without useMemo
  const filteredEntries =
    filteredMood === "All"
      ? entries
      : entries.filter((e) => e.mood === filteredMood.toLowerCase());

  return (
    <div className="min-h-screen px-4 pb-10">
      <h2 className="text-2xl font-bold mb-2 bg-linear-to-r from-[#e1a0e7] to-[#e7e8f3] bg-clip-text text-transparent text-center animate-bounce">
        Your Journal Entries
      </h2>

      {/* Mood filter buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {moods.map((mood) => (
          <button
            key={mood}
            className={`btn btn-sm transition-all duration-200 text-[#ffffff] bg-[#123] ${
              filteredMood === mood ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setFilteredMood(mood)}
          >
            {mood}
          </button>
        ))}
      </div>

      {/* Mood Chart */}
      <MoodChart entries={entries} />

      {/* Journal Entries */}
      <AnimatePresence mode="wait">
        {filteredEntries.length === 0 ? (
          <motion.p
            key="no-entries"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center italic text-gray-500"
          >
            No entries for this mood.
          </motion.p>
        ) : (
          <motion.div
            key="journal-list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col mt-2">
              <JournalList entries={filteredEntries} setEntries={setEntries} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
