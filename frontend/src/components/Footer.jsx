import React from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaUsers,
  FaChartLine,
  FaBell,
  FaComments,
  FaBook,
  FaShieldAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="pt-5 pb-4"
      style={{
        background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
        borderTop: "1px solid rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="container">
        <div className="row g-5">
          {/* Left Section */}
          <div className="col-lg-4">
            <div className="mb-4">
              <h2
                className="h3 fw-bold mb-3"
                style={{
                  background: "linear-gradient(135deg, #4361ee, #7209b7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Churn<span style={{ fontWeight: 800 }}>Prediction</span>
              </h2>
              <p className="text-muted mb-4">
                Advanced analytics to predict customer churn and maximize
                retention rates through data-driven insights.
              </p>
            </div>

            <div className="d-flex gap-3">
              <a href="#" className="social-icon bg-primary">
                <FaLinkedin />
              </a>
              <a href="#" className="social-icon bg-instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-icon bg-info">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon bg-success">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Middle Sections */}
          <div className="col-lg-4">
            <div className="row">
              <div className="col-md-6 mb-4 mb-md-0">
                <h5 className="fw-bold mb-4 text-primary">Our Services</h5>
                <ul className="list-unstyled">
                  <li className="mb-3 d-flex align-items-center">
                    <FaUsers className="me-2 text-purple" />
                    <span>Customer Segmentation</span>
                  </li>
                  <li className="mb-3 d-flex align-items-center">
                    <FaBook className="me-2 text-primary" />
                    <span>Training and Support</span>
                  </li>
                  <li className="mb-3 d-flex align-items-center">
                    <FaComments className="me-2 text-info" />
                    <span>Feedback Mechanism</span>
                  </li>
                  <li className="mb-3 d-flex align-items-center">
                    <FaChartLine className="me-2 text-success" />
                    <span>Analytics Dashboard</span>
                  </li>
                  <li className="d-flex align-items-center">
                    <FaBell className="me-2 text-warning" />
                    <span>Automated Alerts</span>
                  </li>
                </ul>
              </div>

              <div className="col-md-6">
                <h5 className="fw-bold mb-4 text-primary">Company</h5>
                <ul className="list-unstyled">
                  <li className="mb-3 d-flex align-items-center">
                    <span className="bullet bg-primary me-2"></span>
                    <span>About us</span>
                  </li>
                  <li className="mb-3 d-flex align-items-center">
                    <span className="bullet bg-purple me-2"></span>
                    <span>Contact Us</span>
                  </li>
                  <li className="mb-3 d-flex align-items-center">
                    <span className="bullet bg-info me-2"></span>
                    <span>Services</span>
                  </li>
                  <li className="mb-3 d-flex align-items-center">
                    <span className="bullet bg-success me-2"></span>
                    <span>Blog</span>
                  </li>
                  <li className="d-flex align-items-center">
                    <span className="bullet bg-warning me-2"></span>
                    <span>Privacy Policy</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-lg-4">
            <h5 className="fw-bold mb-4 text-primary">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex">
                <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                  <FaMapMarkerAlt className="text-primary" />
                </div>
                <div>
                  <span className="d-block fw-medium">Address</span>
                  <span className="text-muted">
                    Vasai, Mumbai, Maharashtra, 401202
                  </span>
                </div>
              </li>
              <li className="mb-3 d-flex">
                <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                  <FaPhone className="text-success" />
                </div>
                <div>
                  <span className="d-block fw-medium">Phone</span>
                  <span className="text-muted">+91 1234567890</span>
                </div>
              </li>
              <li className="d-flex">
                <div className="bg-purple bg-opacity-10 rounded-circle p-2 me-3">
                  <FaEnvelope className="text-purple" />
                </div>
                <div>
                  <span className="d-block fw-medium">Email</span>
                  <span className="text-muted">contact@churnpredict.com</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="row mt-5 pt-4 border-top">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="text-muted mb-0">
              &copy; 2024 ChurnPrediction. All rights
              reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
