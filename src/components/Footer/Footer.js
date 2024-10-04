import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h1>Aira Tech </h1>
          <p>
            Delivering innovative solutions for your business needs.
            From strategic planning to execution, we ensure quality and efficiency.
            Partner with us to drive success and growth in your industry.
          </p>
        </div>

        <div className="footer-column">
          <h3>Our Services</h3>
          <ul>
            <li><Link to="/services/staffing">Staffing and Recruitment</Link></li>
            <li><Link to="/services/software">Software Development</Link></li>
            <li><Link to="/services/core">Core Recruitment</Link></li>
            <li><Link to="/services/training">Training and Development</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/careers">Careers</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contact Info</h3>
          {/* <p>
            Street 238,52 tempor <br />
            Donec ultricies mattis nulla <br />
            risus tristique ut.
          </p>
          <p>Phone: +01 22 456 7890</p> */}
          <p>hr@airatechsolutions.com</p>
          {/* <p>Website: https://sktthemes.org</p> */}
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; Copyright 2024 Aira Tech. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
