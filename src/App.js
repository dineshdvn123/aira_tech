import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/pages/LandingPage';
import ContactUs from './components/ContactUs/ContactUs';
import Services from './components/Services/Services';
import Footer from './components/Footer/Footer';
import Careers from './components/Careers/Careers';
import JobDetail from './components/JobDetail/JobDetail';
import ServiceDetails from './components/ServiceDetails/ServiceDetails';
import AboutUsPage from './components/AboutUsPage/AboutUsPage';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Ensure scroll position resets to top for each route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/jobs/:jobId" element={<JobDetail />} />
        <Route path="/services/:serviceId" element={<ServiceDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
