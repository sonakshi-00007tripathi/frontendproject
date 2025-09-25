import React, { useState } from "react";
import "../styles/ResumeAnalyzer.css";
import { useNavigate } from "react-router-dom";

/**
 * Frontend-only Resume Analyzer (demo)
 * - paste into src/pages/ResumeAnalyzer.jsx
 * - requires ../styles/ResumeAnalyzer.css
 */

const SAMPLE_INTERN = [
  { id: 1, title: "AI/ML Intern", company: "Infosys", skills: ["python","machine learning","nlp"], stipend: "₹10,000" },
  { id: 2, title: "Frontend Intern", company: "Capgemini", skills: ["javascript","react","css"], stipend: "₹8,000" },
  { id: 3, title: "Data Analyst Intern", company: "Tata", skills: ["sql","excel","data analysis"], stipend: "₹9,000" },
  { id: 4, title: "Cybersecurity Intern", company: "HCL", skills: ["network","security","linux"], stipend: "₹8,500" },
];

function fakeExtractSkills(text) {
  // very simple heuristics for demo
  const lower = text.toLowerCase();
  const keywords = ["python","javascript","react","nlp","machine learning","data analysis","sql","excel","css","html","linux","network","security","aws","django"];
  const found = new Set();
  keywords.forEach(k => { if (lower.includes(k)) found.add(k); });
  // add some derived skills
  if (lower.includes("deep learning")) found.add("deep learning");
  return Array.from(found);
}

function extractExperienceYears(text) {
  // naive: look for "X years"
  const match = text.match(/(\d+)\s+years?/i);
  return match ? parseInt(match[1],10) : null;
}

export default function ResumeAnalyzer() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState(null);
  const [rawText, setRawText] = useState("");
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState("");
  const [experienceYears, setExperienceYears] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");

  const handleFile = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFileName(f.name);
    setLoading(true);

    // Read the text content (for demo we read as text; PDFs may be binary — in real app backend will parse)
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result);
      setRawText(text);

      // Fake NLP extraction
      const extractedSkills = fakeExtractSkills(text);
      const years = extractExperienceYears(text);
      const eduMatch = text.match(/(b\.?tech|bachelor|master|m\.?tech|ph\.?d|bsc|msc|mba|diploma)/i);
      setEducation(eduMatch ? eduMatch[0] : "Not detected");
      setExperienceYears(years || "Not specified");
      setSkills(extractedSkills.length ? extractedSkills : ["communication","teamwork"]);
      setNotes("This is a demo parsing. Results are simulated — connect a backend NLP service to get real parsing.");
      computeSuggestions(extractedSkills);
      setLoading(false);
    };

    // For PDFs, browsers cannot extract text reliably client-side without libs — we read as text for demo
    reader.readAsText(f);
  };

  const computeSuggestions = (extractedSkills) => {
    // simple matching score: count overlap
    const normalize = s => s.replace(/\s+/g,"").toLowerCase();
    const user = extractedSkills.map(normalize);
    const recommended = SAMPLE_INTERN.map(job => {
      const jobSkills = job.skills.map(normalize);
      const overlap = jobSkills.filter(s => user.includes(s)).length;
      const score = Math.round((overlap / Math.max(jobSkills.length,1)) * 100);
      return { ...job, score, overlap };
    }).sort((a,b) => b.score - a.score);
    setSuggestions(recommended);
  };

  const handleAddSkill = () => {
    const newSkill = prompt("Add new skill (e.g. Node.js)");
    if (newSkill) {
      setSkills(prev => {
        const ns = [...prev, newSkill];
        computeSuggestions(ns);
        return ns;
      });
    }
  };

  const removeSkill = (s) => {
    const ns = skills.filter(x => x !== s);
    setSkills(ns);
    computeSuggestions(ns);
  };

  const downloadSummary = () => {
    const payload = {
      fileName,
      skills,
      education,
      experienceYears,
      suggestions,
      notes,
      extractedTextPreview: rawText.slice(0,400)
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pmir_resume_summary_${fileName || "user"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="analyzer-page">
      <div className="analyzer-hero">
        <div className="hero-left">
          <h1>AI Resume Analyzer</h1>
          <p className="subtitle">Upload your resume (PDF/TXT) — get instant skill extraction, matching score, and suggested internships.</p>
          <div className="upload-card">
            <label className="file-label">
              <input type="file" accept=".pdf,.txt,.doc,.docx" onChange={handleFile} />
              <div className="file-drop">
                <img src="https://cdn-icons-png.flaticon.com/512/1099/1099183.png" alt="upload icon" />
                <div>
                  <strong>{fileName || "Drop or choose a file"}</strong>
                  <p className="muted">We simulate parsing in the browser for demo. Real parsing → backend NLP.</p>
                </div>
              </div>
            </label>

            <div className="upload-actions">
              <button className="btn-orange" onClick={() => document.querySelector('input[type=file]').click()}>Choose File</button>
              <button className="btn-blue" onClick={() => { setRawText(""); setFileName(null); setSkills([]); setSuggestions([]); }}>Clear</button>
              <button className="btn-outline" onClick={() => navigate("/find-internship")}>Browse Internships</button>
            </div>

            {loading && <div className="loader">Analyzing <span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></div>}
          </div>

        </div>

        <div className="hero-right">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Artificial_intelligence_neural_network.svg/512px-Artificial_intelligence_neural_network.svg.png" alt="AI" />
          <div className="ai-tip">
            <h4>Smart tips</h4>
            <ul>
              <li>Use keywords (Python, React, SQL) to improve matches.</li>
              <li>Add relevant projects and tool names in resume.</li>
              <li>Upload PDF for best parsing (backend recommended).</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="analyzer-body">
        <section className="extraction">
          <div className="panel">
            <h3>Extracted Skills</h3>
            <p className="muted">Edit tags below to refine suggestions.</p>
            <div className="skill-list">
              {skills.length === 0 && <div className="muted">No skills detected yet — upload a resume or add skills manually.</div>}
              {skills.map((s, idx) => (
                <span key={idx} className="skill-tag">
                  {s}
                  <button onClick={() => removeSkill(s)} aria-label={`remove ${s}`}>×</button>
                </span>
              ))}
              <button className="add-skill" onClick={handleAddSkill}>+ Add Skill</button>
            </div>
          </div>

          <div className="panel">
            <h3>Profile Snapshot</h3>
            <div className="snapshot">
              <div><strong>Education:</strong><span>{education || "Not detected"}</span></div>
              <div><strong>Experience:</strong><span>{experienceYears || "Not specified"}</span></div>
              <div><strong>Notes:</strong><span className="muted small">{notes || "—"}</span></div>
              <div className="download-row">
                <button className="btn-orange" onClick={downloadSummary}>Download Summary</button>
              </div>
            </div>
          </div>
        </section>

        <section className="recommendations">
          <h3>Suggested Internships</h3>
          <div className="recommend-grid">
            {suggestions.map(job => (
              <div key={job.id} className="rec-card">
                <div className="rec-top">
                  <h4>{job.title}</h4>
                  <small className="muted">{job.company}</small>
                </div>
                <p className="muted small">Stipend: {job.stipend}</p>

                <div className="skill-badges">
                  {job.skills.map((sk,i) => <span key={i} className="badge">{sk}</span>)}
                </div>

                <div className="match-row">
                  <div className="match-bar">
                    <div className="fill" style={{ width: `${job.score}%` }} />
                  </div>
                  <div className="score">{job.score}%</div>
                </div>

                <div className="rec-actions">
                  <button className="btn-blue" onClick={() => alert("Demo: Apply flow will open (backend required)")} >Apply</button>
                  <button className="btn-outline" onClick={() => alert(`More info about ${job.title} at ${job.company}`)}>Details</button>
                </div>
              </div>
            ))}
            {suggestions.length === 0 && <div className="muted">Upload a resume to see suggestions.</div>}
          </div>
        </section>

        <section className="extras">
          <h3>AI Suggestions & Improvements</h3>
          <div className="extras-grid">
            <div className="extra-card">
              <img src="https://cdn-icons-png.flaticon.com/512/2910/2910798.png" alt="projects" />
              <h4>Highlight Projects</h4>
              <p>Add 2–3 short project bullets with tech used and outcomes (metrics help!).</p>
            </div>
            <div className="extra-card">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="keywords" />
              <h4>Use Keywords</h4>
              <p>Include exact keywords (e.g., "React", "TensorFlow") to match job filters.</p>
            </div>
            <div className="extra-card">
              <img src="https://cdn-icons-png.flaticon.com/512/1250/1250615.png" alt="format" />
              <h4>Clean Formatting</h4>
              <p>Use simple fonts / bullet points. Avoid images or complex tables that break parsers.</p>
            </div>
            <div className="extra-card">
              <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" alt="cert" />
              <h4>Add Certifications</h4>
              <p>List platform + year (e.g., "ML specialization, Coursera, 2023").</p>
            </div>
          </div>
        </section>

        <section className="raw-preview">
          <h3>Parsed Resume Preview</h3>
          <textarea value={rawText || "No parsed text available (demo)"} readOnly />
        </section>
      </div>
    </div>
  );
}
