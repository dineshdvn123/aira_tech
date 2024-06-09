import React from 'react';
import HeroSection from '../HeroSection/HeroSection';
import ServicesSection from '../ServicesSection/ServicesSection';
import WhatWeServe from '../WhatWeServe/WhatWeServe';
import AboutUs from '../AboutUs/AboutUs';

function LandingPage() {
  return (
    <div>
      <HeroSection/>
      <ServicesSection/>
      <WhatWeServe/>
      <AboutUs/>
    </div>
  );
}

export default LandingPage;