import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5001/api/journal/logout", {}, {
        withCredentials: true,
      });
      setIsAuthenticated(false);       // 🔥 Reset login state
      navigate("/login");              // 🔁 Redirect to login
    } catch (error) {
      console.log("Error while logging out", error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow mb-4">
      <div className="flex-1">
        <span className="text-xl font-bold px-2">🧠 MindJournal</span>
      </div>
      <div className="flex-none space-x-2 px-4">
        <Link className="btn btn-ghost" to="/community">CommunityBoard</Link>
        <Link className="btn btn-ghost" to="/create">New Entry</Link>
        <Link className="btn btn-ghost" to="/entries">View Entries</Link>
        <button className="btn btn-ghost ml-2" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
