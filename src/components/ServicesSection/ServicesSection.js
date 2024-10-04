import React, { useEffect, useRef } from "react";
import {
  FaUsers,
  FaBriefcase,
  FaFileAlt,
  FaLightbulb,
  FaComments,
  FaHandshake,
} from "react-icons/fa"; // React Icons
import "./ServicesSection.css";

const servicesData = [
  {
    title: "IT Talent Acquisition",
    description:
      "We specialize in connecting businesses with top-tier IT professionals who are ready to make a difference. Our focus is on finding the right match for your company culture and technical needs.",
    icon: <FaUsers />, // Icon for Talent Acquisition
  },
  {
    title: "Job Placement Services",
    description:
      "Our team helps candidates discover the perfect job opportunities in leading tech companies, ensuring they find roles that fit their skills and aspirations.",
    icon: <FaBriefcase />, // Icon for Job Placement
  },
  {
    title: "Resume Building & Optimization",
    description:
      "Our expert team offers personalized resume guidance, ensuring your skills and experience stand out to recruiters and hiring managers.",
    icon: <FaFileAlt />, // Icon for Resume Optimization
  },
  {
    title: "Career Consulting",
    description:
      "We provide personalized career advice to help IT professionals make informed decisions about their career path and achieve their long-term goals.",
    icon: <FaLightbulb />, // Icon for Career Consulting
  },
  {
    title: "Interview Coaching",
    description:
      "Ace your interviews with our mock interview sessions and expert feedback. We prepare you to face even the toughest interview panels with confidence.",
    icon: <FaComments />, // Icon for Interview Coaching
  },
  {
    title: "Contract & Full-Time Hiring",
    description:
      "Whether you need short-term contract staff or long-term full-time hires, we offer flexible hiring solutions tailored to your business needs.",
    icon: <FaHandshake />, // Icon for Contract & Full-time Hiring
  },
];

const ServicesSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const serviceItems = Array.from(
      sectionRef.current.querySelectorAll(".service")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    serviceItems.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section className="services-section" ref={sectionRef}>
      <h2
        className="section-title slide-in-top"
        style={{ animationDelay: "1s" }}
      >
        Our Top Services
      </h2>
      <p
        className="section-intro slide-in-top"
        style={{ animationDelay: "1s" }}
      >
        Explore how we can help you find the right talent and elevate your
        career.
      </p>
      <div className="services">
        {servicesData.map((service, index) => (
          <div className="service" key={index}>
            <div
              className="service-icon"
              style={{
                fontSize: "4rem",
                justifyContent: "center",
                display: "flex",
                width: "100%",
                color: "#7776d1",
              }}
            >
              {service.icon}
            </div>
            <h4>{service.title}</h4>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
