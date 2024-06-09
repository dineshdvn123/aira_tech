import React, { useEffect, useRef } from 'react';
import './ServicesSection.css';
import ServiceIcon from '../../assets/Aira_Tech_Logo.png';

const servicesData = [
  {
    title: 'Web Design',
    description: 'Crafting beautiful and functional websites tailored to your needs.',
    icon: '../../assets/HeroSection.jpeg' 
  },
  {
    title: 'Branding',
    description: 'Building a strong brand identity that resonates with your audience.',
    icon: '/path/to/branding-icon.svg'
  },
  {
    title: 'SEO Optimization',
    description: 'Boosting your website visibility on search engines to drive organic traffic.',
    icon: '/path/to/seo-icon.svg'
  },
  {
    title: 'Content Marketing',
    description: 'Creating engaging content that attracts and retains customers.',
    icon: '/path/to/content-marketing-icon.svg'
  },
  {
    title: 'Social Media Management',
    description: 'Managing your social media presence for maximum impact.',
    icon: '/path/to/social-media-icon.svg'
  },
  {
    title: 'Paid Advertising',
    description: 'Targeted advertising campaigns to reach your ideal customers.',
    icon: '/path/to/paid-advertising-icon.svg'
  }
];

const ServicesSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const serviceItems = Array.from(sectionRef.current.querySelectorAll('.service'));

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    serviceItems.forEach(item => {
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
      <h2 className="section-title slide-in-top" style={{ animationDelay: '1s' }}>The Best Services</h2>
      <p className="section-intro slide-in-top" style={{ animationDelay: '1s' }}>We offer a range of expert services to help your business thrive.</p>
      <div className="services">
        {servicesData.map((service, index) => (
          <div className="service" key={index}>
            <img src={ServiceIcon} alt={service.title} />
            <h4>{service.title}</h4>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
