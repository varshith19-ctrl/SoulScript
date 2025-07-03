import { useEffect, useMemo, lazy, Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const JournalList = lazy(() => import("../components/JournalList"));
const MoodChart = lazy(() => import("../components/Moodchart"));

const moods = ["All", "Happy", "Sad", "Neutral", "Angry", "Excited"];

export default function Entries({ entries, setShowNavbar, setEntries }) {
  const [filteredMood, setFilteredMood] = useState("All");

  useEffect(() => {
    setShowNavbar(false);
    return () => setShowNavbar(true);
  }, []);

  // Use useMemo to compute filtered entries only when filteredMood or entries change
  // This avoids unnecessary recalculations and re-renders caused by storing filteredEntries in state
  const filteredEntries = useMemo(() => {
    if (filteredMood === "All") return entries;
    const mood = filteredMood.toLowerCase();
    return entries.filter((e) => e.mood === mood);
  }, [filteredMood, entries]);

  return (
    <div className="min-h-screen px-4 pb-10">
      <h2 className="text-2xl font-bold mb-2 text-[#916570] text-center">
        Your Journal Entries
      </h2>

      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {moods.map((mood) => (
          <button
            key={mood}
            className={`btn btn-sm transition-all duration-200 ${
              filteredMood === mood ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setFilteredMood(mood)}
          >
            {mood}
          </button>
        ))}
      </div>

      {/* Lazy load MoodChart once with simple fallback */}
      <Suspense fallback={<div className="h-32 mb-4 bg-gray-100 animate-pulse rounded-md"></div>}>
        <MoodChart entries={entries} />
      </Suspense>

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
          // Lazy load JournalList once for all filtered entries instead of per entry
          // This reduces overhead and avoids multiple fallback placeholders
          <Suspense fallback={<div className="h-20 bg-gray-100 rounded-md animate-pulse"></div>}>
            <motion.div
              key="journal-list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <JournalList entries={filteredEntries} setEntries={setEntries} />
            </motion.div>
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
}
