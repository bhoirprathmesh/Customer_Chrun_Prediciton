import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import prediction from "../assets/logo.png";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaPaperPlane,
} from "react-icons/fa";
import emailjs from "emailjs-com";
import { useAuth } from "../store/auth";

const ContactUs = () => {
  const defaultContactFormData = {
    username: "",
    email: "",
    phone: "",
    message: "",
  };

  const [contact, setContact] = useState(defaultContactFormData);
  const [userData, setUserData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (userData && user) {
      setContact({
        username: user.username,
        email: user.email,
        phone: user.phone,
        message: "",
      });
      setUserData(false);
    }
  }, [user, userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendMsg = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const templateParams = { ...contact };

    emailjs
      .send(
        import.meta.env.REACT_APP_EMAIL_SERVICE,
        import.meta.env.REACT_APP_EMAIL_TEMPLATE,
        templateParams,
        import.meta.env.REACT_APP_EMAIL_USER_ID
      )
      .then((result) => {
        setContact(defaultContactFormData);
        toast.success("Message Sent Successfully");
      })
      .catch((error) => {
        toast.error("Something Went Wrong");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <div className="container py-4">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div
            className="mx-auto bg-gradient"
            style={{
              width: "80px",
              height: "4px",
              background: "linear-gradient(to right, #4361ee, #7209b7)",
            }}
          ></div>
          <p className="lead">
            ---------- Have questions about churn prediction? We're here to help
            you make data-driven decisions ----------
          </p>
        </div>

        <div className="row g-5">
          {/* Left Image Section */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <div className="gradient-border rounded-3 p-2">
              <img
                src={prediction}
                alt="Contact Us"
                className="img-fluid rounded-3"
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Right Contact Form Section */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-lg p-4 h-100">
              <div className="card-header bg-transparent border-0 text-center py-2">
                <h3 className="fw-bold text-dark mb-0">Send us a Message</h3>
                <p className="text-muted mt-2">
                  ----- We'll respond within 24 hours -----
                </p>
              </div>
              <div className="card-body">
                <form onSubmit={sendMsg}>
                  <div className="mb-4">
                    <label htmlFor="name" className="form-label fw-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="username"
                      placeholder="Enter your full name"
                      className="form-control form-control-lg"
                      value={contact.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email address"
                      className="form-control form-control-lg"
                      value={contact.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="form-label fw-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      className="form-control form-control-lg"
                      value={contact.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="form-label fw-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your churn prediction needs..."
                      rows={4}
                      className="form-control form-control-lg"
                      value={contact.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn w-100 py-3 fw-bold btn-glow"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      <FaPaperPlane className="me-2 text-white" />
                    )}
                    {isSubmitting ? (
                      <span style={{ color: "white" }}>Sending...</span>
                    ) : (
                      <span style={{ color: "white" }}>Send Message</span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-5">
                  <h3 className="fw-bold text-dark">Contact Information</h3>
                  <p className="text-muted">
                    Reach out to us through any of these channels
                  </p>
                </div>

                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="d-flex align-items-center p-3 bg-light rounded-3 h-100">
                      <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                        <FaMapMarkerAlt className="fs-3 text-primary" />
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1">Address</h5>
                        <p className="mb-0">
                          Vasai, Mumbai, Maharashtra, 401202
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="d-flex align-items-center p-3 bg-light rounded-3 h-100">
                      <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                        <FaPhone className="fs-3 text-success" />
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1">Phone</h5>
                        <p className="mb-0">+91 1234567890</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="d-flex align-items-center p-3 bg-light rounded-3 h-100">
                      <div className="bg-purple bg-opacity-10 rounded-circle p-3 me-3">
                        <FaEnvelope className="fs-3 text-purple" />
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1">Email</h5>
                        <p className="mb-0">contact@churnpredict.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-5 pt-4 border-top">
                  <h5 className="fw-bold mb-4">Follow Us</h5>
                  <div className="d-flex justify-content-center gap-3">
                    <a href="#" className="social-icon bg-primary">
                      <FaLinkedin className="fs-5" />
                    </a>
                    <a href="#" className="social-icon bg-instagram">
                      <FaInstagram className="fs-5" />
                    </a>
                    <a href="#" className="social-icon bg-info">
                      <FaTwitter className="fs-5" />
                    </a>
                    <a href="#" className="social-icon bg-success">
                      <FaWhatsapp className="fs-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default ContactUs;
