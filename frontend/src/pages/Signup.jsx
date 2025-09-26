import React, { useState } from "react";
import "../styles/Auth.css";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {


const res = await fetch(`${API_BASE_URL}/api/v1/users/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
  credentials: "include",
});




      const data = await res.json();

      if (res.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Youth Registration</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
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
        <button type="submit" className="btn-orange">Register</button>
        <p>
          Already registered?{" "}
          <span className="link" onClick={() => navigate("/login")}>
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}
