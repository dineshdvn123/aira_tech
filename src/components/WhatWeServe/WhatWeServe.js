import React, { useEffect, useRef } from 'react';
import './WhatWeServe.css';
import JobPlacement from '../../assets/job-placement.png';
import DevelopAndTraining from '../../assets/develop_and_trainng.png';
import JobCounselling from '../../assets/job-counselling.png';
import Interview from '../../assets/interview.png';

const WhatWeServe = () => {
  const sectionRef = useRef(null);
  const serviceItemsRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    if (serviceItemsRef.current) {
      observer.observe(serviceItemsRef.current);
    }
    if (descriptionRef.current) {
      observer.observe(descriptionRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const serviceData = [
    {
      icon: JobPlacement,
      title: 'Jobs Placement',
      shortDescription: 'Matching top talent with the right opportunities.'
    },
    {
      icon: DevelopAndTraining,
      title: 'Develop & Training',
      shortDescription: 'Empowering individuals with skills for career growth.'
    },
    {
      icon: JobCounselling,
      title: 'Jobs Counseling',
      shortDescription: 'Guiding professionals towards fulfilling careers.'
    },
    {
      icon: Interview,
      title: 'Test & Interview',
      shortDescription: 'Preparing candidates for successful interviews and assessments.'
    },
  ];

  const description = "We're committed to connecting the right people with the right jobs. Our comprehensive services cover everything from sourcing and screening candidates to providing interview training and career counseling. We work closely with both job seekers and employers to ensure a successful and fulfilling match.";

  return (
    <div className='full-width-background'>
      <section className="what-we-serve" ref={sectionRef}>
        <div className={`service-items ${serviceItemsRef.current ? 'visible' : ''}`} ref={serviceItemsRef}>
          {serviceData.map((service, index) => (
            <div className="service-item" key={index}>
              <img src={service.icon} alt={service.title} className="service-icon" />
              <h3 className="service-title">{service.title}</h3>
              {/* <p className="service-description">{service.shortDescription}</p> */}
            </div>
          ))}
        </div>
        <div className={`description-section ${descriptionRef.current ? 'visible' : ''}`} ref={descriptionRef}>
          <h2 className="description-title">What We Serve</h2>
          <h2 className="description-heading">THE RECRUITMENT <br/> SOLUTION FOR YOU</h2>
          <p className="description-text">{description}</p>
          <button className="get-started-button">Get Start Now</button>
        </div>
      </section>
    </div>
  );
};

export default WhatWeServe;
