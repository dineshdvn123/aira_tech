import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserTie, FaCode, FaSearch, FaChalkboardTeacher } from 'react-icons/fa'; // Updated Icons
import './Services.css';

const Services = () => {
  const serviceItemsRef = useRef([]);
  const navigate = useNavigate();

  const handleDetailsClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              entry.target.dataset.animation === 'left' ? 'fade-in-left' : 'fade-in-right'
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = serviceItemsRef.current;
    items.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      items.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  return (
    <div className="services-page">
      <div className="page-description-services">
        <h2>Our Services</h2>
      </div>
      <section className="services-content">
        <h4>Our Core Offerings</h4>
        <h3>What We Do?</h3>
        <div className="service-section">
          <div
            className="service-section-item"
            data-animation="left"
            ref={(el) => (serviceItemsRef.current[0] = el)}
          >
            <div className="service-icon" style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
              <FaUserTie size={50} />
            </div>
            <div>
              <h4>Staffing and Recruitment</h4>
              <p>Connecting talented professionals with leading companies to find their perfect match.</p>
              <button onClick={() => handleDetailsClick('staffing')}>Details</button>
            </div>
          </div>
          <div
            className="service-section-item"
            data-animation="right"
            ref={(el) => (serviceItemsRef.current[1] = el)}
          >
            <div className="service-icon" style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
              <FaCode size={50} />
            </div>
            <div>
              <h4>Software Development</h4>
              <p>Providing end-to-end software solutions tailored to your business needs and objectives.</p>
              <button onClick={() => handleDetailsClick('software')}>Details</button>
            </div>
          </div>
          <div
            className="service-section-item"
            data-animation="left"
            ref={(el) => (serviceItemsRef.current[2] = el)}
          >
            <div className="service-icon" style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
              <FaSearch size={50} />
            </div>
            <div>
              <h4>Core Recruitment</h4>
              <p>Specializing in finding and placing candidates for core roles in various industries.</p>
              <button onClick={() => handleDetailsClick('core')}>Details</button>
            </div>
          </div>
          <div
            className="service-section-item"
            data-animation="right"
            ref={(el) => (serviceItemsRef.current[3] = el)}
          >
            <div className="service-icon" style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
              <FaChalkboardTeacher size={50} />
            </div>
            <div>
              <h4>Training and Development</h4>
              <p>Offering comprehensive training programs to enhance skills and advance careers.</p>
              <button onClick={() => handleDetailsClick('training')}>Details</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
