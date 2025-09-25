import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const internships = [
    { id: 1, title: "AI/ML Internship", company: "Tech Corp", location: "Bengaluru" },
    { id: 2, title: "Cybersecurity Analyst Intern", company: "SecureSys", location: "Delhi" },
    { id: 3, title: "Finance Research Intern", company: "FinBank", location: "Mumbai" },
  ];

  return (
    <div className="dashboard">
      {/* Hero Section */}
      <section className="hero">
        <h1>PM Internship Recommender (PMIR)</h1>
        <p>Your gateway to opportunities in India’s top companies</p>
        <button onClick={() => navigate("/signup")} className="cta-btn">
          Get Started
        </button>
      </section>

      {/* Internship Preview */}
      <section className="internships">
        <h2>Featured Internships</h2>
        <div className="cards">
          {internships.map((intern) => (
            <div key={intern.id} className="card">
              <h3>{intern.title}</h3>
              <p><b>{intern.company}</b></p>
              <p>{intern.location}</p>
              <button onClick={() => navigate("/signup")}>Apply Now</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
