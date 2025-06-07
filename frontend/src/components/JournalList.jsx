import axios from "axios";
const moodColor = (mood) => {
  const lower = mood.toLowerCase();
  if (lower.includes("happy") || lower.includes("joy")) return "success";
  if (lower.includes("sad") || lower.includes("down")) return "error";
  if (lower.includes("angry")) return "warning";
  if (lower.includes("anxious") || lower.includes("nervous")) return "info";
  return "neutral";
};

export default function JournalList({ entries, setEntries }) {
  const deleteEntry = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/journal/${id}`);
      setEntries(entries.filter((entry) => entry._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };
  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div
          key={entry._id}
          className="card bg-[#667573] shadow-md p-4 border-[#c4e1d0] border-4"
        >
          <div className="flex justify-between items-center mb-2">
            <span className={`badge badge-${moodColor(entry.mood)} badge-lg`}>
              Mood: {entry.mood}
            </span>
          </div>
          <p className="mb-2 p-4">{entry.text}</p>
          <div className="badge badge-outline badge-info ml-3">
            AI Tone: {entry.aiTone}
          </div>
          <button
            onClick={() => deleteEntry(entry._id)}
            className="btn btn-sm btn-error mt-2 bg-[#f5d2d2]"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
