import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
export default function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/journal/logout`, {
        withCredentials: true,
      });
      setIsAuthenticated(false); //  Reset login state
      navigate("/login"); //  Redirect to login
      toast.success("Logged out successfully");
    } catch (error) {
      console.log("Error while logging out", error);
      toast.error("Failed to log out");
    }
  };

  return (
    <div className="navbar bg-base-100 shadow mb-4">
      <div className="flex-1">
        <span className="text-xl font-bold px-2">🧠 MindJournal</span>
      </div>
      <div className="flex-none space-x-2 px-4">
        <Link className="btn btn-ghost" to="/">
          Home
        </Link>
         <Link className="btn btn-ghost" to="/wellness">
          WellnessSuggestion
        </Link>
        <Link className="btn btn-ghost" to="/community">
          CommunityBoard
        </Link>
        <Link className="btn btn-ghost" to="/create">
          New Entry
        </Link>
        <Link className="btn btn-ghost" to="/entries">
          View Entries
        </Link>
        <button className="btn btn-ghost ml-2" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
