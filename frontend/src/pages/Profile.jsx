import React from "react";
import "../styles/Profile.css";

export default function Profile() {
  return (
    <div className="profile-container">
      {/* Page Title */}
      <h2 className="page-title">My Profile</h2>
      <p className="page-subtitle">Manage your personal information and preferences</p>

      {/* Personal Info */}
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">S</div>
          <h3>Personal Information</h3>
        </div>
        <div className="info-grid">
          <div>
            <label>Full Name</label>
            <p>Sonakshi Tripathi</p>
          </div>
          <div>
            <label>Email Address</label>
            <p>tripathisonakshi705@gmail.com</p>
          </div>
          <div>
            <label>Mobile Number</label>
            <p>9098426485</p>
          </div>
          <div>
            <label>Member Since</label>
            <p>25/09/2025</p>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="profile-card">
        <h3>Bio</h3>
        <p className="bio-text">
          Add a bio to tell others about yourself, your skills, interests, and career goals.
        </p>
        <button className="edit-btn">Edit</button>
      </div>

      {/* Profile Statistics */}
      <div className="profile-card">
        <h3>Profile Statistics</h3>
        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-icon">📊</span>
            <h4>Profile Completion</h4>
            <p className="highlight">75%</p>
          </div>
          <div className="stat-box">
            <span className="stat-icon">📑</span>
            <h4>Applications</h4>
            <p className="highlight">0</p>
          </div>
          <div className="stat-box">
            <span className="stat-icon">⭐</span>
            <h4>Profile Views</h4>
            <p className="highlight">--</p>
          </div>
          <div className="stat-box">
            <span className="stat-icon">🎯</span>
            <h4>Matches</h4>
            <p className="highlight">--</p>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="profile-card">
        <h3>Account Actions</h3>
        <div className="actions-grid">
          <div className="action-box">
            <h4>Find Internships</h4>
            <p>Discover new internship opportunities that match your profile</p>
            <button className="primary-btn">Explore Internships</button>
          </div>
          <div className="action-box">
            <h4>Check Eligibility</h4>
            <p>Verify your eligibility for the PM Internship program</p>
            <button className="outline-btn">Check Now</button>
          </div>
          <div className="action-box">
            <h4>Update Preferences</h4>
            <p>Modify your location and sector preferences for better matches</p>
            <button className="green-btn">Update Preferences</button>
          </div>
        </div>
      </div>
    </div>
  );
}
