import React from "react";
import "./About.css";

export default function About() {
  const developers = [
    {
      name: "Aarav Sharma",
      role: "Frontend Developer",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Priya Mehta",
      role: "Backend Developer",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Rohan Verma",
      role: "ML Engineer",
      img: "https://randomuser.me/api/portraits/men/55.jpg",
    },
    {
      name: "Neha Singh",
      role: "UI/UX Designer",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  return (
    <div className="about-container">
      {/* Hero */}
      
      {/* What is PMIR */}
      <section className="section two-column">
        <div>
          <h2 className="highlight">What is PMIR?</h2>
          <p>
            The PM Internship Recommender (PMIR) is a revolutionary platform
            designed to bridge the gap between talented individuals and
            meaningful internship opportunities across India's top companies.
          </p>
          <p>
            PMIR connects eligible candidates with internship programs that
            provide real-world experience and financial support, using advanced
            recommendation algorithms to match skills and career aspirations.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787"
          alt="Team working"
        />
      </section>

      {/* Mission */}
      <section className="section mission">
        <h2>Our Mission</h2>
        <div className="mission-cards">
          <div className="card">
            <div className="icon">🎯</div>
            <h3>Skill Development</h3>
            <p>Enhance practical skills through real-world projects</p>
          </div>
          <div className="card">
            <div className="icon">🤝</div>
            <h3>Industry Connection</h3>
            <p>Bridge the gap between academics & industry</p>
          </div>
          <div className="card">
            <div className="icon">💡</div>
            <h3>Innovation</h3>
            <p>Foster creativity and innovation in youth</p>
          </div>
          <div className="card">
            <div className="icon">📈</div>
            <h3>Career Growth</h3>
            <p>Provide strong foundation for long-term success</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section benefits">
        <h2>Program Benefits</h2>
        <div className="benefit-cards">
          <div className="benefit">
            <h3>For Interns</h3>
            <ul>
              <li>✔ 12 months of real-world experience</li>
              <li>✔ Monthly financial assistance of ₹5000</li>
              <li>✔ ₹6000 one-time incidental grant</li>
              <li>✔ Skill development and training</li>
              <li>✔ Industry networking opportunities</li>
              <li>✔ Career guidance & mentorship</li>
              <li>✔ Certificate of completion</li>
            </ul>
          </div>
          <div className="benefit">
            <h3>For Companies</h3>
            <ul>
              <li>✔ Access to fresh, talented individuals</li>
              <li>✔ Government support for stipends</li>
              <li>✔ Opportunity to train future employees</li>
              <li>✔ Contribution to skill development</li>
              <li>✔ Enhanced corporate responsibility</li>
              <li>✔ Innovation and fresh perspectives</li>
              <li>✔ Govt. initiative support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Govt Initiative */}
      <section className="section govt">
        <div>
          <h2>Government of India Initiative</h2>
          <p>
            The PM Internship Scheme is a flagship program launched by the
            Government of India to address unemployment and skill gaps. This
            initiative aims to make India a global hub for skilled talent and
            innovation.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1598256988296-0a81f371ebfb"
          alt="Government Initiative"
        />
      </section>

      {/* Developer Team */}
      <section className="section developers">
        <h2>Meet Our Developers</h2>
        <div className="developer-cards">
          {developers.map((dev, i) => (
            <div key={i} className="dev-card">
              <img src={dev.img} alt={dev.name} />
              <h3>{dev.name}</h3>
              <p>{dev.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section cta">
        <h2>Ready to Start Your Journey?</h2>
        <p>
          Join thousands of successful interns who launched their careers
          through PMIR.
        </p>
        <div className="cta-buttons">
          <button className="primary">Find Internships</button>
          <button className="secondary">Check Eligibility</button>
        </div>
      </section>
    </div>
  );
}
