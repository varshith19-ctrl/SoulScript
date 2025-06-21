import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Quotation from "./components/Quotation";
import Home from "./pages/Home";
import Entries from "./pages/Entries";
import Login from "./pages/login";
import Signup from "./pages/signup";
import CommunityBoard from "./pages/Community";
import WellnessSuggestion from "./pages/WellnessSuggestions";
function App() {
  const [entries, setEntries] = useState([]);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showQuotation, setShowQuotation] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔐 Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/journal/checkAuth",
          {
            withCredentials: true,
          }
        );
        if (res.data?.user) setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // 📘 Load journal entries after authentication
  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("http://localhost:5001/api/journal")
        .then((res) => setEntries(res.data))
        .catch((err) => console.error(err));
    }
  }, [isAuthenticated]);

  const addEntry = (entry) => {
    setEntries([entry, ...entries]);
  };

  if (loading) {
    return (
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: "url('/forest.jpg')" }}
      >
        <span className="text-xl font-semibold">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat text-base-content"
        style={{ backgroundImage: "url('/forest.jpg')" }}
      >
        { isAuthenticated && (
          <Navbar setIsAuthenticated={setIsAuthenticated} />
        )}
        {showNavbar && isAuthenticated  && <Quotation />}

        <div className="max-w-2xl mx-auto p-4">
          <Routes>
            {/* 🔓 Public Routes */}
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                isAuthenticated ? (
                  <Navigate to="/login" />
                ) : (
                  <Signup setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />

            {/* 🔐 Protected Routes */}
            <Route
              path="/create"
              element={
                isAuthenticated ? (
                  <Home onNewEntry={addEntry} setShowNavbar={setShowNavbar} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/entries"
              element={
                isAuthenticated ? (
                  <Entries
                    entries={entries}
                    setShowNavbar={setShowNavbar}
                    setEntries={setEntries}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/community"
              element={
                isAuthenticated ? <CommunityBoard setShowNavbar={setShowNavbar}/> : <Navigate to="/login" />
              }
            />
             <Route
              path="/wellness"
              element={
                isAuthenticated ? <WellnessSuggestion entries={entries} setShowNavbar={setShowNavbar}/> : <Navigate to="/login" />
              }
            />

            {/* 🌐 Default Route */}
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
