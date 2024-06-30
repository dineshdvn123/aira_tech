import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <h2>Services</h2>
      </div>
      <section className="services-content">
        <h4>Our Services</h4>
        <h3>What We Do?</h3>
        <div className="service-section">
          <div
            className="service-section-item"
            data-animation="left"
            ref={(el) => (serviceItemsRef.current[0] = el)}
          >
            <img src="" alt="Staffing And Recruitment" />
            <div>
              <h4>Staffing And Recruitment</h4>
              <p>Lorem Ipsum is simply dummy text of the industry standard dummy text ever scrambled type specimen book.</p>
              <button onClick={() => handleDetailsClick('financial')}>Details</button>
            </div>
          </div>
          <div
            className="service-section-item"
            data-animation="right"
            ref={(el) => (serviceItemsRef.current[1] = el)}
          >
            <img src="" alt="Software Development" />
            <div>
              <h4>Software Development</h4>
              <p>Lorem Ipsum is simply dummy text of the industry standard dummy text ever scrambled type specimen book.</p>
              <button onClick={() => handleDetailsClick('software')}>Details</button>
            </div>
          </div>
          <div
            className="service-section-item"
            data-animation="left"
            ref={(el) => (serviceItemsRef.current[2] = el)}
          >
            <img src="" alt="Core Recruitment" />
            <div>
              <h4>Core Recruitment</h4>
              <p>Lorem Ipsum is simply dummy text of the industry standard dummy text ever scrambled type specimen book.</p>
              <button onClick={() => handleDetailsClick('core')}>Details</button>
            </div>
          </div>
          <div
            className="service-section-item"
            data-animation="right"
            ref={(el) => (serviceItemsRef.current[3] = el)}
          >
            <img src="" alt="Training Classroom's" />
            <div>
              <h4>Training Classroom's</h4>
              <p>Lorem Ipsum is simply dummy text of the industry standard dummy text ever scrambled type specimen book.</p>
              <button onClick={() => handleDetailsClick('training')}>Details</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
