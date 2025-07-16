import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import prediction from "../assets/UserAvatar.png";
import "react-toastify/dist/ReactToastify.css";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaChartLine,
  FaLightbulb,
  FaMoneyBillWave,
  FaUserFriends,
  FaCogs,
  FaArrowUp,
} from "react-icons/fa";
import emailjs from "emailjs-com";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const primaryColor = "#4361ee"; // Updated to a vibrant blue
  const secondaryColor = "#7209b7"; // Complementary purple

  // Contact form state
  const defaultContactFormData = {
    username: "",
    email: "",
    phone: "",
    message: "",
  };

  const [contact, setContact] = useState(defaultContactFormData);
  const [userData, setUserData] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { user } = useAuth();

  // Check scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Auto-populate user data if logged in
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
          ...contact,
          message: "",
        });
        toast.success("Message Sent Successfully");
      })
      .catch((error) => {
        toast.error("Something Went Wrong");
      });
  };

  return (
    <div className="home-container mt-5">
      {/* Scroll to top button */}
      {showScrollTop && (
        <div className="scroll-top-btn" onClick={scrollToTop}>
          <FaArrowUp />
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-section py-5 position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100">
          <div
            className="position-absolute top-20 start-10 w-72 h-72 bg-blue-200 rounded-circle opacity-30 animate-pulse"
            style={{ mixBlendMode: "multiply", filter: "blur(20px)" }}
          ></div>
          <div
            className="position-absolute top-40 end-10 w-72 h-72 bg-purple-200 rounded-circle opacity-30 animate-pulse"
            style={{
              animationDelay: "2s",
              mixBlendMode: "multiply",
              filter: "blur(20px)",
            }}
          ></div>
          <div
            className="position-absolute bottom-20 start-50 w-72 h-72 bg-indigo-200 rounded-circle opacity-30 animate-pulse"
            style={{
              animationDelay: "4s",
              mixBlendMode: "multiply",
              filter: "blur(20px)",
            }}
          ></div>
        </div>

        <Container className="position-relative">
          <Row className="align-items-center">
            <Col lg={7} className="mb-4 mb-lg-0">
              <div>
                <p className="text-primary fw-bold fs-3 mb-2">
                  WELCOME TO CHURN PREDICTION
                </p>
                <h1 className="display-4 fw-bold text-dark">
                  Your trusted partner for
                  <span className="text-gradient"> smart prediction</span>
                  <br />
                  solutions.
                </h1>
                <p className="lead mt-3 mb-4">
                  Leverage advanced analytics and machine learning to predict
                  customer churn and maximize retention rates with data-driven
                  insights.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                  <Button
                    className="btn-glow fw-bold px-4 py-3"
                    onClick={() => navigate("/prediction")}
                  >
                    Start Prediction
                  </Button>
                  <Button
                    variant="outline-primary"
                    className="btn-glow-outline fw-bold px-4 py-3"
                  >
                    Learn More
                  </Button>
                </div>

                <div className="d-flex gap-5 pt-4">
                  <div className="text-center">
                    <div className="fs-2 fw-bold">95%</div>
                    <div className="text-muted">Accuracy Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="fs-2 fw-bold">500+</div>
                    <div className="text-muted">Companies Served</div>
                  </div>
                  <div className="text-center">
                    <div className="fs-2 fw-bold">24/7</div>
                    <div className="text-muted">Support</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={5} className="d-flex justify-content-center">
              <div className="position-relative h-100 w-100">
                <div className="gradient-border p-2 rounded-3">
                  <Card className="border-0">
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="fw-bold mb-0">
                          Churn Analytics Dashboard
                        </h5>
                        <div className="d-flex gap-1">
                          <span
                            className="d-inline-block rounded-circle bg-danger"
                            style={{ width: "12px", height: "12px" }}
                          ></span>
                          <span
                            className="d-inline-block rounded-circle bg-warning"
                            style={{ width: "12px", height: "12px" }}
                          ></span>
                          <span
                            className="d-inline-block rounded-circle bg-success"
                            style={{ width: "12px", height: "12px" }}
                          ></span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div
                          className="d-flex align-items-end gap-2"
                          style={{ height: "120px" }}
                        >
                          {[65, 80, 45, 90, 75, 85, 70].map((height, index) => (
                            <div
                              key={index}
                              className="flex-grow-1 d-flex flex-column align-items-center"
                            >
                              <div
                                className="w-100 rounded-top"
                                style={{
                                  height: `${height}%`,
                                  background:
                                    "linear-gradient(to top, #4361ee, #7209b7)",
                                }}
                              ></div>
                              <div className="text-muted small mt-2">
                                Q{index + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Row>
                        <Col className="mb-3 mb-md-0">
                          <div className="text-center p-3 bg-primary bg-opacity-10 rounded">
                            <FaChartLine className="fs-4 text-primary mb-2" />
                            <div className="small fw-bold">Retention Rate</div>
                            <div className="fs-5 fw-bold text-primary">87%</div>
                          </div>
                        </Col>
                        <Col className="mb-3 mb-md-0">
                          <div className="text-center p-3 bg-purple bg-opacity-10 rounded">
                            <FaUserFriends className="fs-4 text-purple mb-2" />
                            <div className="small fw-bold">Active Users</div>
                            <div className="fs-5 fw-bold text-purple">2.4K</div>
                          </div>
                        </Col>
                        <Col>
                          <div className="text-center p-3 bg-success bg-opacity-10 rounded">
                            <FaChartLine className="fs-4 text-success mb-2" />
                            <div className="small fw-bold">Predictions</div>
                            <div className="fs-5 fw-bold text-success">156</div>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section className="about-section py-5 bg-white mt-3 mb-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-dark mb-3">
              What is <span className="text-primary">Churn Prediction?</span>
            </h2>
            <div
              className="mx-auto bg-gradient"
              style={{
                width: "80px",
                height: "4px",
                background: "linear-gradient(to right, #4361ee, #7209b7)",
              }}
            ></div>
          </div>

          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <p className="fs-5 text-muted">
                Churn prediction refers to the process of identifying customers
                who are likely to stop using a service or product within a
                certain timeframe. This is particularly relevant in
                subscription-based businesses, such as telecoms, SaaS (Software
                as a Service), and online services, where retaining customers is
                crucial for long-term profitability.
              </p>

              <Row className="mt-4">
                <Col sm={4} className="mb-3">
                  <div className="text-center p-3">
                    <div
                      className="mx-auto mb-3 bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "70px", height: "70px" }}
                    >
                      <FaChartLine className="fs-3 text-primary" />
                    </div>
                    <div className="fw-bold">AI-Powered</div>
                  </div>
                </Col>
                <Col sm={4} className="mb-3">
                  <div className="text-center p-3">
                    <div
                      className="mx-auto mb-3 bg-purple bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "70px", height: "70px" }}
                    >
                      <FaUserFriends className="fs-3 text-purple" />
                    </div>
                    <div className="fw-bold">Precise Targeting</div>
                  </div>
                </Col>
                <Col sm={4} className="mb-3">
                  <div className="text-center p-3">
                    <div
                      className="mx-auto mb-3 bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "70px", height: "70px" }}
                    >
                      <FaLightbulb className="fs-3 text-success" />
                    </div>
                    <div className="fw-bold">Real-time Analysis</div>
                  </div>
                </Col>
              </Row>

              <div className="d-flex flex-wrap gap-3 mt-4">
                <Button
                  className="btn-glow fw-bold"
                  onClick={() =>
                    document
                      .getElementById("contact-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  CONTACT US
                </Button>
                <Button
                  variant="outline-primary"
                  className="btn-glow-outline fw-bold"
                >
                  OUR SERVICES
                </Button>
              </div>
            </Col>

            <Col lg={6}>
              <Card className="border-0 shadow-lg">
                <Card.Body className="p-4">
                  <Card.Title className="fs-3 fw-bold mb-4">
                    Analytics Overview
                  </Card.Title>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted">Customer Retention</span>
                      <span className="fw-bold text-success">87%</span>
                    </div>
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "87%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted">Churn Risk Score</span>
                      <span className="fw-bold text-warning">23%</span>
                    </div>
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className="progress-bar bg-warning"
                        role="progressbar"
                        style={{ width: "23%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted">Prediction Accuracy</span>
                      <span className="fw-bold text-primary">95%</span>
                    </div>
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "95%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="alert alert-primary mt-4">
                    <strong>Pro Tip:</strong> Early identification of at-risk
                    customers can increase retention rates by up to 40%.
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="features-section py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-dark mb-1">
              Why Choose <span className="text-primary">Churn Prediction?</span>
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
              ---------- Discover the key benefits of implementing churn prediction in your
              business strategy ----------
            </p>
          </div>

          <Row className="g-4">
            {[
              {
                title: "Improved Customer Retention",
                description:
                  "By identifying at-risk customers, businesses can implement targeted strategies to retain them, reducing churn rates.",
                icon: <FaChartLine className="fs-3" />,
              },
              {
                title: "Enhanced Customer Insights",
                description:
                  "Analyzing churn data provides valuable insights into customer behavior and preferences, allowing for more personalized experiences.",
                icon: <FaUserFriends className="fs-3" />,
              },
              {
                title: "Cost Efficiency",
                description:
                  "Retaining existing customers is often cheaper than acquiring new ones, making churn prediction a cost-effective strategy for your company.",
                icon: <FaMoneyBillWave className="fs-3" />,
              },
              {
                title: "Informed Decision-Making",
                description:
                  "Data-driven insights from churn prediction can guide marketing, sales, and customer service strategies.",
                icon: <FaLightbulb className="fs-3" />,
              },
              {
                title: "Increased Revenue",
                description:
                  "By minimizing churn, companies can maintain a stable revenue stream and maximize the lifetime value of customers.",
                icon: <FaChartLine className="fs-3" />,
              },
              {
                title: "Resource Allocation",
                description:
                  "Understanding which customers are likely to churn helps in prioritizing resources for retention efforts.",
                icon: <FaCogs className="fs-3" />,
              },
            ].map((feature, index) => (
              <Col lg={4} md={6} key={index}>
                <Card className="h-100 border-0 shadow-sm hover-shadow transition-all position-relative overflow-hidden feature-card">
                  <div className="position-absolute top-0 end-0 bg-primary text-white px-3 py-1 fw-bold rounded-bl">
                    0{index + 1}
                  </div>
                  <Card.Body className="p-4">
                    <div
                      className="mb-4 bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center"
                      style={{ width: "70px", height: "70px" }}
                    >
                      {feature.icon}
                    </div>
                    <Card.Title className="fw-bold mb-3">
                      {feature.title}
                    </Card.Title>
                    <Card.Text className="text-muted">
                      {feature.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="contact-section py-5 bg-white">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-dark mb-1">
              Get In <span className="text-primary">Touch</span>
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
              ---------- Have questions about churn prediction? We're here to help you make
              data-driven decisions ----------
            </p>
          </div>

          <Row className="g-4">
            <Col lg={6}>
              <Card className="border-0 shadow-lg h-100">
                <Card.Body className="p-4">
                  <Card.Title className="text-center mb-4 fw-bold">
                    Send us a Message
                  </Card.Title>
                  <form onSubmit={sendMsg}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Full Name</label>
                      <input
                        type="text"
                        name="username"
                        placeholder="Enter your full name"
                        className="form-control form-control-lg"
                        value={contact.username}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        className="form-control form-control-lg"
                        value={contact.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        className="form-control form-control-lg"
                        value={contact.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold">Message</label>
                      <textarea
                        name="message"
                        placeholder="Tell us about your churn prediction needs..."
                        rows={4}
                        className="form-control form-control-lg"
                        value={contact.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>

                    <Button
                      type="submit"
                      className="btn-glow w-100 fw-bold py-3"
                    >
                      SEND MESSAGE
                    </Button>
                  </form>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6}>
              <Card className="border-0 shadow-lg h-100">
                <Card.Body className="p-4">
                  <Card.Title className="text-center mb-4 fw-bold">
                    Contact Information
                  </Card.Title>

                  <div className="text-center mb-4">
                    <div
                      className="mx-auto mb-3 rounded-circle overflow-hidden"
                      style={{ width: "150px", height: "150px" }}
                    >
                      <div className="gradient-border rounded-circle p-2">
                        <img
                          src={prediction}
                          alt="Contact"
                          className="img-fluid rounded-circle w-100 h-100 object-fit-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="d-flex align-items-start mb-4">
                      <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                        <FaMapMarkerAlt className="fs-4 text-primary" />
                      </div>
                      <div>
                        <h5 className="fw-bold">Address</h5>
                        <p className="text-muted mb-0">
                          Vasai, Mumbai, Maharashtra, 401202
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-start mb-4">
                      <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                        <FaPhone className="fs-4 text-success" />
                      </div>
                      <div>
                        <h5 className="fw-bold">Phone</h5>
                        <p className="text-muted mb-0">+91 1234567890</p>
                      </div>
                    </div>

                    <div className="d-flex align-items-start">
                      <div className="bg-purple bg-opacity-10 rounded-circle p-3 me-3">
                        <FaEnvelope className="fs-4 text-purple" />
                      </div>
                      <div>
                        <h5 className="fw-bold">Email</h5>
                        <p className="text-muted mb-0">
                          contact@churnpredict.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-top">
                    <h5 className="fw-bold text-center mb-3">Follow Us</h5>
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
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
