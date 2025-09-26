import React, { useState } from "react";
import "../styles/FindInternship.css";
import {
  FaUser,
  FaGraduationCap,
  FaLaptopCode,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import API_BASE_URL from "../config";

export default function FindInternship() {
  const [form, setForm] = useState({
    name: "",
    degree: "",
    year_of_study: "",
    domain: "",
    skills: "",
    resume: null,
    location_preference: "",
    duration_preference: "",
    stipend_expectation: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setForm({ ...form, resume: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      for (const key in form) {
        if (form[key] !== null) {
          formData.append(key, form[key]);
        }
      }

      const res = await fetch(`${API_BASE_URL}/api/internship/submit`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Recommendations fetched!");
        console.log("Recommendations:", data.recommendations);
        // yahan data.recommendations ko state me set karo taaki frontend me dikh paaye
      } else {
        alert(data.message || "Submission failed");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Server error, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="find-internship-page">
      <div className="form-header">
        <h2>🎓 Student Internship Profile</h2>
        <p>
          Fill in your details to get <span>ML-powered internship recommendations</span>.
        </p>
      </div>

      <form className="internship-form" onSubmit={handleSubmit}>
        {/* Identification */}
        <div className="form-card">
          <h3>👤 Identification</h3>
          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Academic Info */}
        <div className="form-card">
          <h3>🎓 Academic Info</h3>
          <div className="input-group">
            <FaGraduationCap className="icon" />
            <select
              name="degree"
              value={form.degree}
              onChange={handleChange}
              required
            >
              <option value="">Select Degree</option>
              <option>B.Tech</option>
              <option>MBA</option>
              <option>B.Sc</option>
              <option>M.Sc</option>
              <option>Other</option>
            </select>
          </div>
          <div className="input-group">
            <FaGraduationCap className="icon" />
            <select
              name="year_of_study"
              value={form.year_of_study}
              onChange={handleChange}
              required
            >
              <option value="">Select Year of Study</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>
          </div>
          <div className="input-group">
            <FaLaptopCode className="icon" />
            <select
              name="domain"
              value={form.domain}
              onChange={handleChange}
              required
            >
              <option value="">Select Domain</option>
              <option>AI/ML</option>
              <option>Web Development</option>
              <option>Cybersecurity</option>
              <option>Finance</option>
              <option>Marketing</option>
            </select>
          </div>
        </div>

        {/* Skills */}
        <div className="form-card">
          <h3>💡 Skills</h3>
          <div className="input-group">
            <FaLaptopCode className="icon" />
            <input
              type="text"
              name="skills"
              placeholder="Enter skills (comma separated)"
              value={form.skills}
              onChange={handleChange}
              required
            />
          </div>
          <small>Add 3–5 core skills for better matches</small>
        </div>

        {/* Resume Upload */}
        <div className="form-card resume-upload-highlight">
          <h3>Upload Resume</h3>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="file-upload"
          />
          <small>PDF, DOC, DOCX supported</small>
        </div>

        {/* Preferences */}
        <div className="form-card">
          <h3>📍 Preferences</h3>
          <div className="input-group">
            <FaMapMarkerAlt className="icon" />
            <select
              name="location_preference"
              value={form.location_preference}
              onChange={handleChange}
              required
            >
              <option value="">Select Location Preference</option>
              <option>Remote</option>
              <option>Delhi</option>
              <option>Mumbai</option>
              <option>Bangalore</option>
              <option>Hyderabad</option>
            </select>
          </div>
          <input
            type="text"
            name="duration_preference"
            placeholder="Preferred Duration (e.g. 6 months)"
            value={form.duration_preference}
            onChange={handleChange}
          />
          <input
            type="text"
            name="stipend_expectation"
            placeholder="Stipend Expectation (optional)"
            value={form.stipend_expectation}
            onChange={handleChange}
          />
        </div>

        {/* Contact */}
        <div className="form-card">
          <h3>📞 Contact</h3>
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <FaPhone class name="icon" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Submitting..." : "Get Internship Recommendations"}
        </button>
      </form>
    </div>
  );
}
