import React, { useState } from "react";
import "./FindInternship.css";

export default function FindInternship() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    skills: "",
    education: "",
    locations: [],
    sectors: [],
    age: "",
    jobStatus: "Not Employed Full Time",
    enrolled: "Not Enrolled Full Time",
    familyIncomeOK: true,
    familyGovJobNo: true,
  });

  const [result, setResult] = useState(null);

  const CITIES = ["Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Kolkata"];
  const SECTORS = ["AI/ML", "Cybersecurity", "Finance", "Data Science", "Web Dev"];

  const toggleLocation = (city) => {
    setForm((prev) => {
      const has = prev.locations.includes(city);
      return { ...prev, locations: has ? prev.locations.filter((c) => c !== city) : [...prev.locations, city] };
    });
  };

  const toggleSector = (sector) => {
    setForm((prev) => {
      const has = prev.sectors.includes(sector);
      return { ...prev, sectors: has ? prev.sectors.filter((s) => s !== sector) : [...prev.sectors, sector] };
    });
  };

  const checkEligibility = () => {
    const age = Number(form.age);
    return (
      age >= 21 &&
      age <= 24 &&
      form.jobStatus === "Not Employed Full Time" &&
      form.enrolled === "Not Enrolled Full Time" &&
      form.familyIncomeOK &&
      form.familyGovJobNo
    );
  };

  const handleFetch = (e) => {
    e.preventDefault();
    if (!checkEligibility()) {
      setResult({ eligible: false });
      return;
    }
    // Demo internships — replace with backend API later
    const demoInternships = Array.from({ length: 5 }).map((_, i) => ({
      id: i + 1,
      title: `${form.sectors[0] || "General"} Internship ${i + 1}`,
      company: `Company ${i + 1}`,
      location: form.locations.join(", ") || "Remote",
      stipend: "₹4500 / month",
    }));
    setResult({ eligible: true, internships: demoInternships });
  };

  return (
    <div className="find-container">
      <h2>Find Internship</h2>
      <form onSubmit={handleFetch} className="form-box">
        <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Email / Phone" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
        <input placeholder="Skills (comma separated)" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
        <input placeholder="Education / Qualification" value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} />

        <label>Location Preferences:</label>
        <div className="multi-options">
          {CITIES.map((city) => (
            <button
              type="button"
              key={city}
              className={form.locations.includes(city) ? "selected" : ""}
              onClick={() => toggleLocation(city)}
            >
              {city}
            </button>
          ))}
        </div>

        <label>Sector Interests:</label>
        <div className="multi-options">
          {SECTORS.map((sector) => (
            <button
              type="button"
              key={sector}
              className={form.sectors.includes(sector) ? "selected" : ""}
              onClick={() => toggleSector(sector)}
            >
              {sector}
            </button>
          ))}
        </div>

        <label>Age:</label>
        <input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} required />

        <label>Job Status:</label>
        <select value={form.jobStatus} onChange={(e) => setForm({ ...form, jobStatus: e.target.value })}>
          <option>Not Employed Full Time</option>
          <option>Employed Full Time</option>
        </select>

        <label>Education Status:</label>
        <select value={form.enrolled} onChange={(e) => setForm({ ...form, enrolled: e.target.value })}>
          <option>Not Enrolled Full Time</option>
          <option>Enrolled Full Time</option>
        </select>

        <label>Family Income ≤ ₹8 Lakhs?</label>
        <select value={form.familyIncomeOK ? "yes" : "no"} onChange={(e) => setForm({ ...form, familyIncomeOK: e.target.value === "yes" })}>
          <option value="yes">Yes (OK)</option>
          <option value="no">No (Not Eligible)</option>
        </select>

        <label>Any family member with Govt job?</label>
        <select value={form.familyGovJobNo ? "no" : "yes"} onChange={(e) => setForm({ ...form, familyGovJobNo: e.target.value === "no" })}>
          <option value="no">No (OK)</option>
          <option value="yes">Yes (Not Eligible)</option>
        </select>

        <label>Upload CV (PDF)</label>
        <input type="file" accept="application/pdf" />

        <button type="submit" className="fetch-btn">Fetch Internships</button>
      </form>

      {result && !result.eligible && (
        <div className="not-eligible">
          ❌ You are not eligible for the PM Internship Scheme.
        </div>
      )}

      {result && result.eligible && (
        <div className="internship-results">
          <h3>Recommended Internships</h3>
          <div className="cards">
            {result.internships.map((intern) => (
              <div key={intern.id} className="card">
                <h4>{intern.title}</h4>
                <p><b>{intern.company}</b></p>
                <p>{intern.location}</p>
                <p>{intern.stipend}</p>
                <button>Apply Now</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
