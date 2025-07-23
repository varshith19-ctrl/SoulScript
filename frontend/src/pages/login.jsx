// src/components/Login.jsx

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUser, FaLock } from 'react-icons/fa'; // Make sure to run: npm install react-icons

function Login({ setIsAuthenticated, setLoginPage }) {
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
      setLoginPage(false);
      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.error || "An unexpected error occurred.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="relative min-h-screen  animate-gradient-pan flex items-center justify-center p-4 overflow-hidden">
      
      {/* <div className="absolute top-20 -left-20 w-64 h-64 bg-white/10 rounded-full animate-float" style={{ animationDelay: '0s' }}></div> */}
      {/* <div className="absolute bottom-20 -right-20 w-72 h-72 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div> */}

      <div className="relative z-10 w-full max-w-md p-8 space-y-8 bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl animate-float" style={{ animationDelay: '1s' }}>
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-soft-white">Welcome Back</h1>
          <p className="mt-2 text-soft-white/80">Login to continue your journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {error && (
            <div className="p-3 text-center text-sm text-white bg-red-500/50 rounded-lg">
              {error}
            </div>
          )}

          <div className="relative">
            <div className="absolute top-1/2 left-3 -translate-y-1/2 text-soft-white/60">
              <FaUser />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full py-3 pl-10 pr-4 text-black bg-white/10 rounded-lg border border-transparent placeholder-soft-white/70 focus:outline-none focus:ring-2 focus:ring-calm-blue transition-all duration-300"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-3 -translate-y-1/2 text-soft-white/60">
              <FaLock />
            </div>
            <input
              type="password"
              placeholder="Password"
              className="w-full py-3 pl-10 pr-4 text-black bg-white/10 rounded-lg border border-transparent placeholder-soft-white/70 focus:outline-none focus:ring-2 focus:ring-calm-blue transition-all duration-300"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-semibold text-deep-purple bg-soft-white rounded-lg hover:bg-calm-blue hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>

        <div className="text-center text-soft-white/80">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="font-semibold hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;