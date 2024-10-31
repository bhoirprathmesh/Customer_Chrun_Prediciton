import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-dark pt-5 pb-4 bg-blue shadow ">
      <div className="container">
        <div className="row">
          {/* Left Section */}
          <div className="col-md-4 mb-4">
            <h2 className="h5 fw-bold fs-3">Churn<span className='text-primary'>Prediction</span></h2>
            <p className="mb-4">
            When a customer ceases to engage with a service or stops paying for a subscription.</p>
          </div>

          {/* Middle Left Section */}
          <div className="col-md-2 mb-4">
            <h5 className="fw-bold fs-4">Our Services</h5>
            <ul className="list-unstyled">
              <li>Customer Segmentation</li>
              <li>Training and Support</li>
              <li>Feedback Mechanism</li>
              <li>Predictive Analytics Dashboard</li>
              <li>Automated Alerts</li>
            </ul>
          </div>

          {/* Middle Right Section */}
          <div className="col-md-2 mb-4">
            <h5 className="fw-bold fs-4">Company</h5>
            <ul className="list-unstyled">
              <li>About us</li>
              <li>Contact Us</li>
              <li>services</li>

            </ul>
          </div>

          {/* Right Section */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold fs-4">Contact Us</h5>
            <p className="mb-2"><FaMapMarkerAlt /> Vasai, Mumbai, Maharashtra, 401202</p>
            <p className="mb-2"><FaPhone /> +911234567890</p>
            <p className="mb-2"><FaEnvelope /> contact.com</p>
            <div className="d-flex">
              <a href="#" className="text-dark mr-3"><FaLinkedin size={24} /></a>
              <a href="#" className="text-dark mr-3 ms-3"><FaInstagram size={24} /></a>
              <a href="#" className="text-dark mr-3 ms-3"><FaTwitter size={24} /></a>
              <a href="#" className="text-dark mr-3 ms-3"><FaWhatsapp size={24} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
