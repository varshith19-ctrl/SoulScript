import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Entries from "./pages/Entries";
import Login from "./pages/login";
import Signup from "./pages/signup";

function App() {
  const [entries, setEntries] = useState([]);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch entries only if authenticated
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

  return (
    <Router>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat text-base-content"
        style={{ backgroundImage: "url('/forest.jpg')" }}
      >
        {showNavbar && isAuthenticated && <Navbar />}

        <div className="max-w-2xl mx-auto p-4">
          <Routes>

            {/* Public Routes */}
            <Route
              path="/login"
              element={
                isAuthenticated
                  ? <Navigate to="/" />
                  : <Login setIsAuthenticated={setIsAuthenticated} />
              }
            />
            <Route
              path="/signup"
              element={
                isAuthenticated
                  ? <Navigate to="/login" />
                  : <Signup setIsAuthenticated={setIsAuthenticated} />
              }
            />

            {/* Protected Routes */}
            <Route
              path="/create"
              element={
                isAuthenticated
                  ? <Home onNewEntry={addEntry} setShowNavbar={setShowNavbar} />
                  : <Navigate to="/login" />
              }
            />
            <Route
              path="/entries"
              element={
                isAuthenticated
                  ? <Entries entries={entries} setShowNavbar={setShowNavbar} setEntries={setEntries} />
                  : <Navigate to="/login" />
              }
            />

            {/* Default route */}
            <Route
              path="/"
              element={
                isAuthenticated
                  ? <Navigate to="/" />
                  : <Navigate to="/login" />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
