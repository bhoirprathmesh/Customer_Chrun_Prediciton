import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import prediction from '../assets/p1.jpeg';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import emailjs from "emailjs-com";
import { useAuth } from '../store/auth';

const ContactUs = () => {
  const defaultContactFormData = {
    username: "",
    email: "",
    phone: "",
    message: "",
  };

  const [contact, setContact] = useState(defaultContactFormData);
  const [userData, setUSerData] = useState(true);
  const { user } = useAuth();

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      phone: user.phone,
      message: "",
    });
    setUSerData(false);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendMsg = (e) => {
    e.preventDefault();
    const templateParams = { ...contact };

    emailjs
      .send(
        import.meta.env.REACT_APP_EMAIL_SERVICE,
        import.meta.env.REACT_APP_EMAIL_TEMPLATE,
        templateParams,
        import.meta.env.REACT_APP_EMAIL_USER_ID
      )
      .then((result) => {
        setContact(defaultContactFormData); // Reset the form
        toast.success("Message Sent Successfully");
      })
      .catch((error) => {
        toast.error("Something Went Wrong");
      });
  };

  return (
    <>
      <div className="container py-5">
        <div className="text-center">
          <h2 className="fw-bold" style={{ color: "#007bff" }}> - Contact Us - </h2>
          <hr />
          <p className="lead fw-bold">Have questions or inquiries? Get in touch with us!</p>
        </div>

        <div className="row mt-5">
          {/* Left Image Section */}
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img
              src={prediction}
              alt="Contact Us"
              className="img-fluid shadow-lg"
              style={{ borderRadius: '10px' }}
            />
          </div>

          {/* Right Contact Form Section */}
          <div className="col-md-6">
            <div className="card shadow-lg p-4" style={{ backgroundColor: "#f9f9f9", borderColor: "#007bff" }}>
              <h3 className="text-center mb-4 fw-bold" style={{ color: "#007bff" }}>Send us a Message</h3>
              <form onSubmit={sendMsg}>
                <div className="form-group mb-3">
                  <label htmlFor="name" className="form-label">Username</label>
                  <input
                    type="text"
                    id="name"
                    name="username"
                    placeholder="Username"
                    className="form-control"
                    value={contact.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    value={contact.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    className="form-control"
                    value={contact.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Enter Your Message..."
                    rows={4}
                    className="form-control"
                    value={contact.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn w-100"
                  style={{ backgroundColor: "#007bff", color: "white" }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Contact Info Section Below */}
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="card shadow-lg p-4" style={{ backgroundColor: "#f9f9f9" }}>
              <h3 style={{ color: "#007bff" }}>Contact Information</h3>
              <p className="mb-2"><FaMapMarkerAlt /> Vasai, Mumbai, Maharashtra, 401202</p>
              <p className="mb-2"><FaPhone /> +911234567890</p>
              <p className="mb-2"><FaEnvelope /> contact@eseva.com</p>
              <hr />
              <div className="d-flex">
                <a href="#" className="text-dark mr-3"><FaLinkedin size={36} /></a>
                <a href="#" className="text-dark mr-3 ms-3"><FaInstagram size={36} /></a>
                <a href="#" className="text-dark mr-3 ms-3"><FaTwitter size={36} /></a>
                <a href="#" className="text-dark mr-3 ms-3"><FaWhatsapp size={36} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ContactUs;
