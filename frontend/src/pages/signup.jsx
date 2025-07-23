// src/components/Signup.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUser, FaLock } from 'react-icons/fa'; // Make sure to run: npm install react-icons

function Signup({ setIsAuthenticated }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // State for form entry animation
  const [isFormMounted, setIsFormMounted] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsFormMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL || "http://localhost:5000";
      await axios.post(`${backendUrl}/api/journal/register`, form);
      toast.success("Signup successful! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        setError("Something went wrong while signing up. Please try again.");
        toast.error("Something went wrong while signing up.");
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative min-h-screen  animate-gradient-pan flex items-center justify-center p-4 overflow-hidden">


      <div className="relative z-10 w-full max-w-md p-8 space-y-8 bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl animate-float" style={{ animationDelay: '1s' }}>

        <div className="text-center">
          <h1 className="text-4xl font-bold text-soft-white">Create Account</h1>
          <p className="mt-2 text-soft-white/80">Join us and start your journey.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

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
              type="text"
              placeholder="Username"
              className="w-full py-3 pl-10 pr-4 text-black bg-white/10 rounded-lg border border-transparent placeholder-soft-white/70 focus:outline-none focus:ring-2 focus:ring-calm-blue transition-all duration-300"
              required
              value={form.username}
              onChange={handleChange}
              name="username"
              id="username"
            />
          </div>

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
              onChange={handleChange}
              name="email"
              id="email"
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
              onChange={handleChange}
              name="password"
              id="password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-semibold text-deep-purple bg-soft-white rounded-lg hover:bg-calm-blue hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center text-soft-white/80 text">
          <p>
            Already have an account?{" "}
            <a href="/login" className="font-semibold hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;