import React from 'react'
import './AboutUsPage.css'
import AboutUsImage from '../../assets/AboutUsImage.jpg';

function AboutUsPage() {
  return (
    <div>
    <div className="page-description-aboutus">
        <h2>About Us</h2>
    </div>
    <section className="about-us" style={{flexDirection: 'column'}}>
    <div className="about-image">
                <img src={AboutUsImage} alt="About Us" />
            </div>
            <div className="about-content">
                <h3>Empower Your Business with Strategic Staffing Solutions</h3>
                <p>Welcome to AiraTech Consultancy Services, where we specialize in transforming businesses through innovative staffing and recruiting solutions. Established with a vision to redefine workforce dynamics, we cater to diverse industries including IT, healthcare, finance, and engineering.</p>
                <h2>Our Mission</h2>

<p>At AiraTech, our mission is clear: to assist businesses in adapting and thriving in dynamic environments through strategic staffing solutions. We are committed to delivering value-driven recruitment services that exceed expectations and drive organizational success.</p>

<h2>What Sets Us Apart</h2>

<ul>
  <li><strong>Expertise:</strong> With deep industry knowledge and a global network, we offer specialized staffing solutions tailored to meet the unique needs of each client.</li>
  <li><strong>Innovation:</strong> Leveraging advanced technology and AI-driven tools, we streamline the recruitment process to ensure efficiency and accuracy.</li>
  <li><strong>Client-Centric Approach:</strong> Building long-term partnerships is at the core of our service. We prioritize understanding our clients' cultures, values, and goals to deliver personalized and effective staffing solutions.</li>
</ul>

<h2>Our Process</h2>

<p>From initial consultation to candidate placement and beyond, our structured approach ensures seamless integration and support throughout the recruitment lifecycle. We focus on compliance, quality assurance, and continuous improvement to deliver exceptional results consistently.</p>

<h2>Get in Touch</h2>

<p>Explore how AiraTech Consultancy Services can empower your business with strategic staffing solutions. Contact us today to learn more about our services and how we can help you achieve your staffing goals.</p>
            </div>
        </section>
    </div>
  )
}

export default AboutUsPage