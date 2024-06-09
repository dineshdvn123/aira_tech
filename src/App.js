import React, {useEffect} from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/pages/LandingPage';
import ContactUs from './components/ContactUs/ContactUs'
import Footer from './components/Footer/Footer'
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);
  
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;