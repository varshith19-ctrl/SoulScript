import { useEffect ,useState} from "react";
import JournalForm from "../components/JournalForm";
import axios from "axios";
export default function Home({ onNewEntry, setShowNavbar }) {
  useEffect(() => {
    setShowNavbar(false); //  hide navbar on this page
    return () => setShowNavbar(true); //  show navbar again when leaving
  }, []);
  const [prompt, setPrompt] = useState("");

const fetchPrompt = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/journal/prompt`, { withCredentials: true });
    setPrompt(res.data.prompt);
  } catch (err) {
    console.error("Prompt fetch failed:", err.response?.data || err.message);
  }
};


  return (
    <div className="mt-5 ">
      <div className="tooltip ">
  <div className="tooltip-content bg-[#c2d485]">
    <div className="animate-bounce text-[#155e0e] -rotate-10 text-2xl">Just Click it!</div>
  </div>
  <button className="btn bg-linear-to-r from-[#80348b] to-[#3d4098]"  onClick={fetchPrompt}>Suggest a Prompt</button>
</div>
      <p className="text-sm italic mb-2 text-[#ffffff]">{prompt}</p>

      <JournalForm onNewEntry={onNewEntry} />
    </div>
  );
}
