import { useEffect, useState } from "react";
import JournalList from "../components/JournalList";
import MoodChart from "../components/Moodchart";
import { motion, AnimatePresence } from "framer-motion";

const moods = ["All", "Happy", "Sad", "Neutral", "Angry", "Excited"];

export default function Entries({ entries, setShowNavbar, setEntries }) {
  const [filteredMood, setFilteredMood] = useState("All");
  const [filteredEntries, setFilteredEntries] = useState(entries);

  useEffect(() => {
    setShowNavbar(false); // hide navbar on this page
    return () => setShowNavbar(true); // show navbar when leaving
  }, []);

  useEffect(() => {
    if (filteredMood === "All") {
      setFilteredEntries(entries);
    } else {
      setFilteredEntries(entries.filter((e) => e.mood === filteredMood.toLowerCase()));
    }
  }, [filteredMood, entries]);

  return (
    <div>
      <MoodChart entries={entries} />

      {/* Filter buttons */}
      <div className="flex gap-2 mb-6 justify-center mt-4">
        {moods.map((mood) => (
          <button
            key={mood}
            className={`btn btn-sm ${
              filteredMood === mood ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setFilteredMood(mood)}
          >
            {mood}
          </button>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4 text-[#916570]">
        Your Journal Entries
      </h2>

      {/* Animated Journal List */}
      <AnimatePresence>
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
          filteredEntries.map((entry) => (
            <motion.div
              key={entry._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <JournalList entries={[entry]} setEntries={setEntries} />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
}
