import React, { useState } from "react";
import "../styles/Recommendation.css";

export default function RecommendationDashboard() {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("");
  const [location, setLocation] = useState("");

  // Dummy internships
  const internships = [
    { id: 1, title: "AI/ML Intern", company: "Infosys", stipend: "₹10,000", sector: "AI/ML", location: "Bangalore", eligibility: "21–24 yrs, unemployed" },
    { id: 2, title: "Cybersecurity Intern", company: "TCS", stipend: "₹8,000", sector: "Cybersecurity", location: "Delhi", eligibility: "Must know Networking" },
    { id: 3, title: "Finance Analyst Intern", company: "HDFC", stipend: "₹12,000", sector: "Finance", location: "Mumbai", eligibility: "B.Com/BBA students" },
  ];

  // Filters
  const filtered = internships.filter((i) => {
    return (
      (sector ? i.sector === sector : true) &&
      (location ? i.location === location : true) &&
      (search ? i.title.toLowerCase().includes(search.toLowerCase()) : true)
    );
  });

  return (
    <div className="recommend-container">
      <h2>Internship Recommendations</h2>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search internships..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sector} onChange={(e) => setSector(e.target.value)}>
          <option value="">All Sectors</option>
          <option value="AI/ML">AI/ML</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="Finance">Finance</option>
        </select>

        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">All Locations</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
        </select>
      </div>

      {/* Flip Cards */}
      <div className="card-grid">
        {filtered.map((i) => (
          <div className="flip-card" key={i.id}>
            <div className="flip-inner">
              <div className="flip-front">
                <h3>{i.title}</h3>
                <p>{i.company}</p>
                <p><strong>{i.stipend}</strong></p>
              </div>
              <div className="flip-back">
                <p><b>Eligibility:</b> {i.eligibility}</p>
                <button className="btn-orange">Apply Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
