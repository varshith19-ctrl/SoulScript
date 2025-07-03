import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login({ setIsAuthenticated ,setLoginPage}) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/journal/login`, form);
      setIsAuthenticated(true);
      toast.success("Login successful");
      setLoginPage(false)
      
      navigate("/");
      

    } catch (err) {
      setError(err.response?.data?.error );
      toast.error("something went wrong while logging in "); }
  };

  return (
    
      <form
        onSubmit={handleSubmit}
        className=" p-8 rounded-xl shadow-lg w-full max-w-sm space-y-4 mt-50 ml-33 bg-[#6d86b6]"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>
        {error && <div className="text-error">{error}</div>}
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
        <button type="submit" className="btn btn-primary w-full bg-[#4b694c]">
          Login
        </button>
        <p className="text-sm text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#212702]">
            Signup
          </a>
        </p>
      </form>
     
    
  );
}

export default Login;
