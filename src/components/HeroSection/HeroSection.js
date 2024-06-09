import React from 'react';
import './HeroSection.css'; // Create a CSS file for styling
import heroImage from '../../assets/Coding_4.png';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="fade-in-text">Discover Your Dream Job with Us</h1>
        <p className="fade-in-text" style={{ animationDelay: '0.5s' }}>
          Empowering You to Pursue Your Passion<br />
          and Achieve Career Success
        </p>
        <button className="fade-in-text" style={{ animationDelay: '1s' }}>Start Your Journey</button>
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="hero-section" />
      </div>
    </section>

  );
};

export default HeroSection;
