import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './ContactUs.css';

const GetInTouch = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); 

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^\d{10}$/;
    return regex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const newErrors = {};
    if (!validateEmail(email)) {
      newErrors.email = true;
    }
    if (!validatePhone(phone)) {
      newErrors.phone = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false); // Stop loading
      return;
    }

    try {
      const response = await axios.post('https://airatech-admin-backend.onrender.com/sendMail', {
        name,
        email,
        phone,
        message,
      });

      if (response.status === 200) {
        toast.success('Request was sent successfully!');
      } else {
        toast.error('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setLoading(false); // Stop loading
    }

    // Clear the form
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setErrors({});
  };

  const handleInputChange = (e, setter, validator) => {
    setter(e.target.value);
    if (errors[e.target.name]) {
      const newErrors = { ...errors };
      if (validator(e.target.value)) {
        delete newErrors[e.target.name];
      }
      setErrors(newErrors);
    }
  };

  return (
    <section className="get-in-touch">
      <ToastContainer position="top-right" style={{ zIndex: 9999 }} />
      {loading && (
        <div className={`dimming-overlay ${loading ? 'active' : ''}`}>
        <div className="loader-gif"></div>
      </div>
      )}
      <div className={`container ${loading ? 'blur' : ''}`}>
        <h2>GET IN TOUCH</h2>
        <p>
          Kindly fill out your details we will contact you soon.
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>YOUR DETAILS</h3>
          <div className="form-row">
            <div className={`input-wrapper ${errors.phone ? 'error' : ''}`}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => handleInputChange(e, setName, () => true)}
                required
              />
            </div>
            <div className={`input-wrapper ${errors.phone ? 'error' : ''}`}>
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={phone}
                onChange={(e) => handleInputChange(e, setPhone, validatePhone)}
                required
              />
              {errors.phone && <span className="error-icon">!</span>}
            </div>
          </div>
          <div className={`input-wrapper ${errors.email ? 'error' : ''}`}>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => handleInputChange(e, setEmail, validateEmail)}
              required
            />
            {errors.email && <span className="error-icon">!</span>}
          </div>
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit">SEND MESSAGE</button>
        </form>
      </div>
    </section>
  );
};

export default GetInTouch;
