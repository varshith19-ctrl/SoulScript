import { useEffect ,useState} from "react";
import JournalForm from "../components/JournalForm";
import axios from "axios";
export default function Home({ onNewEntry, setShowNavbar }) {
  useEffect(() => {
    setShowNavbar(false); // ✅ hide navbar on this page
    return () => setShowNavbar(true); // ✅ show navbar again when leaving
  }, []);
  const [prompt, setPrompt] = useState("");

const fetchPrompt = async () => {
  try {
    const res = await axios.get("http://localhost:5001/api/journal/prompt", { withCredentials: true });
    setPrompt(res.data.prompt);
  } catch (err) {
    console.error("Prompt fetch failed:", err.response?.data || err.message);
  }
};


  return (
    <div className="mt-5 ">
      <button className="btn btn-outline btn-accent mb-4" onClick={fetchPrompt}>
        ✨ Suggest a Prompt
      </button>
      <p className="text-sm italic mb-2 text-[#11304e]">{prompt}</p>

      <JournalForm onNewEntry={onNewEntry} />
    </div>
  );
}
