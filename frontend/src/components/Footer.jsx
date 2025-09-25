import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* Brand / About */}
        <div className="footer-brand">
          <h3>PM Internship Recommender</h3>
          <p>
            Connecting talented individuals with meaningful internship
            opportunities across India’s top companies.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/find-internship">Find Internship</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/eligibility">Eligibility</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="3" required></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        © 2025 PM Internship Recommender | Powered by Government of India Initiative
      </div>
    </footer>
  );
}
