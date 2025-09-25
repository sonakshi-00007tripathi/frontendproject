import React from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const partners = [
    "https://contentstatic.techgig.com/thumb/msid-111504977,width-800,resizemode-4/Capgemini-to-launch-new-campus-in-Chennai-5000-seats-available.jpg?11154",
    "https://www.livemint.com/lm-img/img/2025/04/11/600x338/im-94189865_1744196523049_1744359035551.jpg",
    "https://media.istockphoto.com/id/1421030803/photo/microsoft-logo.jpg?s=1024x1024&w=is&k=20&c=cvo-6xcqX5ZzrOZCdgqiWS4D3SrKtDwCFiy1VddssRg=",
    "https://media.istockphoto.com/id/1338072522/photo/infosys-u-s-education-center-infosys-is-based-in-india-and-is-a-worldwide-it-ai-and-digital.jpg?s=1024x1024&w=is&k=20&c=s_1CnWC44rcBXkD5e6bBeH31dQ2_SL0CJOk8y-Cogdg=",
  ];

  return (
    <div className="home-page">
      {/* Top Govt Bar */}
      <div className="govt-bar">
        भारत सरकार / Government of India
      </div>

      {/* Header */}
      <header className="main-header">
        <div className="logo">PMIR Internship</div>
        <div className="header-btns">
          <button className="btn-orange" onClick={() => navigate("/signup")}>
            Youth Registration
          </button>
          <button className="btn-orange" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </header>

     

   {/* Hero Banner */}
<section className="hero">
  <div className="hero-text">
    <h1>Stay Protected</h1>
    <p className="hero-subtitle">
      Complete your Internship process now under PMIR scheme and unlock
      opportunities across India with financial support, mentorship,
      and real-world exposure.
    </p>

    <div className="hero-buttons">
      <button className="btn-orange">Complete Process</button>
      
    </div>

    <div className="hero-highlights ">
      <div>
        <span>🎓</span>
        <p>Internships in top companies</p>
      </div>
      <div>
        <span>💰</span>
        <p>₹5000 monthly assistance</p>
      </div>
      <div>
        <span>🌍</span>
        <p>Opportunities across India</p>
      </div>
    </div>
  </div>

  <div className="hero-img">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Prime_Minister%2C_Shri_Narendra_Modi%2C_in_New_Delhi_on_August_08%2C_2019_%28cropped%29.jpg"
      alt="PM"
    />
  </div>
</section>


      {/* Announcement Ticker */}
      <div className="ticker">
        <marquee>Selection Ongoing! Please check your dashboard, email, and SMS regularly for updates.</marquee>
      </div>

      

      {/* Partners Logos */}
      <section className="partners">
        <h2>Our Partners</h2>
        <div className="logo-strip">
          {partners.map((logo, i) => (
            <img key={i} src={logo} alt="partner" />
          ))}
        </div>
      </section>

{/* Social Media Gallery */}
<section className="social-gallery">
  <h2>Social Media Gallery</h2>
  <div className="gallery-strip">
    <div className="gallery-card insta">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
        alt="Instagram"
      />
      <p>@mca21india</p>
      <button>View Profile</button>
    </div>

    <div className="gallery-card yt">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png"
        alt="YouTube"
      />
      <p>Internship Moments</p>
      <button>Watch</button>
    </div>

    <div className="gallery-card linkedin">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
        alt="LinkedIn"
      />
      <p>Ministry of Corporate Affairs</p>
      <button>Follow</button>
    </div>

    <div className="gallery-card twitter">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg"
        alt="Twitter"
      />
      <p>@MCA21India</p>
      <button>Follow</button>
    </div>
     {/* ✅ New Facebook card */}
    <div className="gallery-card fb">
      <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" />
      <p>PMIR Official</p>
      <button>Like Page</button>
    </div>

  </div>
</section>

      



  

 

      {/* About Section */}
      <section className="about-section">
        <h2>About PMIR</h2>
        <p>
          PMIR connects India's youth to internships across sectors with financial support
          and mentorship opportunities. The program ensures inclusivity and equal access.
        </p>
      </section>

      
    </div>
  );
}
