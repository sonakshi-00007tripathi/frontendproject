import React from "react";
import "../styles/Eligibility.css";
import { FaUserCheck,  FaGraduationCap, FaRupeeSign, FaBuilding } from "react-icons/fa";
import { MdWork, MdOutlineSecurity } from "react-icons/md";

export default function Eligibility() {
  const criteria = [
    { id: 1, icon: <FaUserCheck />, text: "Age between 21–24 years" },
    { id: 2, icon: <MdWork />, text: "Not employed full time" },
    { id: 3, icon: <FaGraduationCap />, text: "Not enrolled in full-time education" },
    { id: 4, icon: <FaRupeeSign />, text: "Family income ≤ ₹8 Lakhs PA" },
    { id: 5, icon: <FaBuilding />, text: "No family member has a Govt. job" },
  ];

  const benefits = [
    { id: 1, icon: <MdOutlineSecurity />, title: "12 Months Real-life Experience", desc: "Work with India's top companies and gain exposure." },
    { id: 2, icon: <FaRupeeSign />, title: "Monthly Assistance", desc: "₹4500 from Govt. of India + ₹500 from Industry." },
    { id: 3, icon: <FaRupeeSign />, title: "One-time Grant", desc: "₹6000 support for incidental expenses." },
    { id: 4, icon: <FaGraduationCap />, title: "Choice of Sectors", desc: "Select from AI/ML, Cybersecurity, Finance, and more." },
  ];

  return (
    <div className="eligibility-container">
      <h2>Eligibility Criteria</h2>
      <div className="card-grid">
        {criteria.map((c) => (
          <div key={c.id} className="card premium-card">
            <div className="icon">{c.icon}</div>
            <p>{c.text}</p>
          </div>
        ))}
      </div>

      <h2>Core Benefits</h2>
      <div className="card-grid">
        {benefits.map((b) => (
          <div key={b.id} className="card premium-card">
            <div className="icon">{b.icon}</div>
            <h3>{b.title}</h3>
            <p>{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
