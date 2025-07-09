import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Signup({ setIsAuthenticated }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/journal/register`, form);
      toast.success("Signup successful");
      navigate("/login");
    } catch (err) {
      
      toast.error("Something went wrong while signing up");
    }
  };

  return (
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-xl shadow-lg w-full max-w-sm space-y-4 mt-50 ml-33 bg-[#d5d3d6]"
      >
        <h2 className="text-xl font-bold text-center text-[#072a4c]">Signup</h2>
        {error && <div className="text-error">{error}</div>}
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full"
          required
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="btn btn-primary w-full bg-[#29394a]">
          Signup
        </button>
        <p className="text-sm text-center text-[#874646]">
          Already have an account?{" "}
          <a href="/login" className="text-[#210223]">
            Login
          </a>
        </p>
      </form>
  );
}

export default Signup;
