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
  const [submitStatus, setSubmitStatus] = useState('');
  const [errorStatus, setErrorStatus] = useState('');
  const [errors, setErrors] = useState({});

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
    setSubmitStatus('');
    setErrorStatus('');

    const newErrors = {};
    if (!validateEmail(email)) {
      newErrors.email = true;
    }
    if (!validatePhone(phone)) {
      newErrors.phone = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    try {
      // Sending the form data to the backend using Axios
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
      toast.error('Failed to send message. Please try again later.');
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
      <div className="container">
      <ToastContainer style={{zIndex: 999999}}/>
        <h2>GET IN TOUCH</h2>
        <p>
          Kindly fill out your details we will contact you soon.
        </p>
        {/* <div className="contact-info">
          <div className="info-item">
            <img src="/path/to/location-icon.svg" alt="Location" />
            <p>123 Main Street, Anytown, CA 12345</p>
          </div>
          <div className="info-item">
            <img src="/path/to/email-icon.svg" alt="Email" />
            <p>contact@example.com</p>
          </div>
          <div className="info-item">
            <img src="/path/to/phone-icon.svg" alt="Phone" />
            <p>+1 (555) 555-5555</p>
          </div>
        </div> */}
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
