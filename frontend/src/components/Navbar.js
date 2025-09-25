// src/components/Navbar.js
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";  // ✅ import context
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);   // ✅ get logout from context

  return (
    <header className="navbar">
      {/* Logo */}
      <div className="logo" onClick={() => navigate("/home")}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Emblem_of_India_with_transparent_background.png?20230404104251"
          alt="PMIR Logo"
          className="logo-img"
        />
        <span>PMIR Internship</span>
      </div>

      {/* Links */}
      <nav className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/find-internship">Find Internship</Link>
        <Link to="/about">About</Link>
        <Link to="/eligibility">Eligibility</Link>

        <Link to="/recommendations">Recommendations</Link>
        <Link to="/resume-analyzer">Resume Analyzer</Link>

      </nav>

      {/* Profile Dropdown */}
      <div className="navbar-profile">
        <button onClick={() => setOpen(!open)} className="profile-btn">
          👤
        </button>
        {open && (
          <div className="dropdown">
            <button
              onClick={() => {
                setOpen(false);
                navigate("/profile");
              }}
            >
              Profile
            </button>
            <button
              onClick={() => {
                setOpen(false);
                logout();       // ✅ clear session
                navigate("/login"); // ✅ send user back to login
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
