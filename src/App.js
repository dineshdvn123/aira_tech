import React from 'react';
import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/pages/LandingPage';
import ContactUs from './components/ContactUs/ContactUs'
import Footer from './components/Footer/Footer'
import Careers from './components/Careers/Careers';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;