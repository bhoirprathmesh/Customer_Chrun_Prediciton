import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const LogoutHandler = () => {
    localStorage.removeItem("token");
    toast.success("Logout Success", { position: "top-right", autoClose: 2000 });
    navigate("/");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg sticky-top py-2 px-3 transition-all ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
      style={{ transition: "all 0.3s ease" }}
    >
      <div className="container-fluid">
        <Link
          to="/"
          className="navbar-brand fw-bold fs-3 d-flex align-items-center"
          style={{
            background: "linear-gradient(135deg, #4361ee, #7209b7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Churn<span style={{ fontWeight: 800 }}>Prediction</span>
        </Link>

        <button
          className="navbar-toggler shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {[
              { path: "/", label: "Home" },
              { path: "/services", label: "Services" },
              { path: "/prediction", label: "Prediction" },
              { path: "/contactus", label: "Contact" },
            ].map((item) => (
              <li className="nav-item mx-2" key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link position-relative fw-medium px-3 py-2 ${
                      isActive ? "text-primary" : "text-dark opacity-75"
                    }`
                  }
                  style={{ fontSize: "1.05rem" }}
                >
                  {item.label}
                  <span
                    className="position-absolute bottom-0 start-0 w-100 bg-gradient"
                    style={{
                      height: "2px",
                      background: "linear-gradient(90deg, #4361ee, #7209b7)",
                      transform: "scaleX(0)",
                      transition: "transform 0.3s ease",
                    }}
                  ></span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center">
                  <FaUserCircle className="fs-4 text-primary me-2" />
                  <span className="d-none d-md-inline text-dark fw-medium">
                    {user?.username || "User"}
                  </span>
                </div>
                <button
                  onClick={LogoutHandler}
                  className="btn btn-sm d-flex align-items-center gap-1 fw-medium"
                  style={{
                    background: "linear-gradient(135deg, #4361ee, #7209b7)",
                    color: "white",
                    borderRadius: "50px",
                    padding: "0.4rem 1.2rem",
                  }}
                >
                  <FaSignOutAlt className="me-1" />
                  <span className="d-none d-md-inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/register"
                className="btn btn-sm fw-medium"
                style={{
                  background: "linear-gradient(135deg, #4361ee, #7209b7)",
                  color: "white",
                  borderRadius: "50px",
                  padding: "0.4rem 1.2rem",
                }}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
