import React from "react";
import AboutUsImage from "../../assets/AboutUs.png";
import { useNavigate } from "react-router-dom";
import "./AboutUs.css";

const AboutUs = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/about");
  };


  return (
    <section className="about-us" >
      <div className="about-content">
        <h2>ABOUT US</h2>
        <h3>Connecting Talent with Opportunity</h3>
        <p>
          At AiraTech Solutions, we are dedicated to bridging the gap between
          skilled IT professionals and top-tier employers. Our mission is to
          provide comprehensive staffing solutions and career development
          services that help individuals and organizations thrive. With a deep
          understanding of the tech industry and a commitment to excellence, we
          offer tailored services to meet your unique needs.
        </p>
        <button className="call-to-action" onClick={handleGetStartedClick}>
          Know More
        </button>
      </div>
      <div className="about-image">
        <img src={AboutUsImage} alt="About Us" />
      </div>
    </section>
  );
};

export default AboutUs;
