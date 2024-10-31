import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import prediction from '../assets/p1.jpeg';
import "react-toastify/dist/ReactToastify.css";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import emailjs from "emailjs-com";
import { useAuth } from '../store/auth';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();
  const primaryColor = "#007bff"; // Primary color defined

  // Contact
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
    })

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
        setContact({
          username: "",
          email: "",
          phone: "",
          message: "",
        });
        toast.success("Message Sent Successfully");
      })
      .catch((error) => {
        toast.error("Something Went Wrong");
      });
  };

  return (
    <div className="bg-light text-dark py-5">
      <div className="container">
        <div className="row align-items-center mb-5">
          {/* Text Section */}
          <div className="col-md-8 mb-4">
            <p className="text-primary mb-1 fw-bold fs-2">Welcome to churn prediction</p>
            <h1 className="display-5 font-weight-bold">
              Your trusted partner for smart,
              <br />
              prediction solutions.
            </h1>
            <div className="mt-4">
              <button className="btn fw-bold" onClick={() => navigate('/prediction')} style={{ backgroundColor: primaryColor, color: "white" }}>PREDICTION</button>
            </div>
          </div>
          {/* Image Section */}
          <div className="col-md-4 d-flex justify-content-center">
            <img
              src={prediction} // Replace with the actual path to your image
              alt="Team working"
              className="img-fluid" // Use Bootstrap's img-fluid class to make the image responsive
              style={{ maxWidth: "100%", height: "100%"}} // Ensure image adjusts properly within the container
            />
          </div>
        </div>
      </div>

      <section className="about-us bg-white py-5">
        <Container>
          <Row>
            <h1 className="text-center text-primary fw-bold mb-4">-Churn Prediction-</h1>
            <Col md={6} className="d-flex align-items-center">
              <div>
                <p className='fw-bold fs-5'>
                  Churn prediction refers to the process of identifying customers who are likely to stop using a service or product within a certain timeframe. This is particularly relevant in subscription-based businesses, such as telecoms, SaaS (Software as a Service), and online services, where retaining customers is crucial for long-term profitability.
                </p>

                <div className="d-flex mt-3">
                  <Button className="btn fw-bold" style={{ backgroundColor: primaryColor, color: "white" }}>CONTACT US</Button>
                  <Button className='btn ms-3 fw-bold' style={{ backgroundColor: primaryColor, color: "white" }}>SERVICES</Button>
                </div>
              </div>
            </Col>
            <Col md={6} className="d-flex justify-content-center align-items-center"> {/* Centering classes added */}
              <img 
                src={prediction} 
                alt="E-Waste Management" 
                className="img-fluid" 
                style={{ maxWidth: "75%", height: "auto" }} // height set to auto for better aspect ratio
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Grid section */}
      <div className="container py-5 mt-5">
        <div className="row text-center">
          {[
            {
              number: "01",
              title: "Improved Customer Retention",
              description: "By identifying at-risk customers, businesses can implement targeted strategies to retain them, reducing churn rates."
            },
            {
              number: "02",
              title: "Enhanced Customer Insights",
              description: "Analyzing churn data provides valuable insights into customer behavior and preferences, allowing for more personalized experiences."
            },
            {
              number: "03",
              title: "Cost Efficiency",
              description: "Retaining existing customers is often cheaper than acquiring new ones, making churn prediction a cost-effective strategy for you company."
            },
            {
              number: "04",
              title: "Informed Decision-Making",
              description: "Data-driven insights from churn prediction can guide marketing, sales, and customer service strategies."
            },
            {
              number: "05",
              title: "Increased Revenue",
              description: "By minimizing churn, companies can maintain a stable revenue stream and maximize the lifetime value of customers."
            },
            {
              number: "06",
              title: "Resource Allocation",
              description: "Understanding which customers are likely to churn helps in prioritizing resources for retention efforts."
            },
          ].map((feature, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="feature-box animate-box">
                <div className="feature-number bg-primary">{feature.number}</div>
                <h4 className='mt-4 fw-bold' style={{ color: primaryColor }}>{feature.title}</h4>
                <p className='fs-5'>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="container py-5">
        <div className="text-center">
          <h2 className="fw-bold" style={{ color: primaryColor }}> - Contact Us - </h2>
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
            <div className="card shadow-lg p-4" style={{ backgroundColor: "#f9f9f9", borderColor: primaryColor }}>
              <h3 className="text-center mb-4 fw-bold" style={{ color: primaryColor }}>Send us a Message</h3>
              <form onSubmit={sendMsg}>
                <div className="form-group mb-3">
                  <label htmlFor="name" className="form-label fw-bold">Username</label>
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
                  <label htmlFor="email" className="form-label fw-bold">Email</label>
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
                  <label htmlFor="phone" className="form-label fw-bold">Phone</label>
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
                  <label htmlFor="message" className="form-label fw-bold">Message</label>
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
                  className="btn w-100 fw-bold"
                  style={{ backgroundColor: primaryColor, color: "white" }}
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Contact Info Section Below */}
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="card shadow-lg p-4" style={{ backgroundColor: "#f9f9f9" }}>
              <h3 style={{ color: primaryColor }}>Contact Information</h3>
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
    </div>
  );
};

export default Home;
