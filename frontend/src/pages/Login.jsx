import React, { useState, useContext } from "react";
import "../styles/Auth.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API_BASE_URL from "../config";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include", // ✅ for cookies (optional)
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token); // ✅ Save token in context + localStorage
        alert("Login successful!");
        navigate("/home");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-orange">Login</button>
        <p>
          Not registered yet?{" "}
          <span className="link" onClick={() => navigate("/signup")}>
            Signup here
          </span>
        </p>
      </form>
    </div>
  );
}
