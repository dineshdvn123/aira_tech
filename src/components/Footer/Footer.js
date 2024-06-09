import React from 'react';
import './Footer.css'; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h1>Aira Tech</h1>
          <p>
            Suspendisse interdum, nisi nec <br />
            effitur auctor, odio icongue ligula, <br />
            eget sodales tortor turpis at elit. <br />
            Aliquam iaculis ipsum ut odio variusid <br />
            interdum lac dictum.
          </p>
        </div>

        <div className="footer-column">
          <h3>Our Services</h3>
          <ul>
            <li>Solicitory</li>
            <li>Business Planning</li>
            <li>Human Resources</li>
            <li>Strategy</li>
            <li>Start Ups</li>
            <li>Organizations</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>RTL Tested</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contact Info</h3>
          <p>
            Street 238,52 tempor <br />
            Donec ultricies mattis nulla <br />
            risus tristique ut.
          </p>
          <p>Phone: +01 22 456 7890</p>
          <p>E-mail: support@sitename.com</p>
          <p>Website: https://sktthemes.org</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; Copyright 2024 Aira Tech. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
