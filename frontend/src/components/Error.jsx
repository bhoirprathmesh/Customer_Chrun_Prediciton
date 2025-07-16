import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

function Error() {
  return (
    <section
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #f0f5ff, #e6f0ff)",
        padding: "20px",
      }}
    >
      <div
        className="text-center p-5 rounded-4 shadow-lg"
        style={{
          background: "white",
          maxWidth: "800px",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative elements */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "radial-gradient(circle, rgba(67, 97, 238, 0.1) 0%, transparent 70%)",
            zIndex: 0,
          }}
        ></div>

        <div className="position-relative z-1">
          {/* Animated 404 text */}
          <div
            className="display-1 fw-bold mb-4"
            style={{
              background: "linear-gradient(135deg, #4361ee, #7209b7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "10rem",
              lineHeight: 1,
              letterSpacing: "-10px",
            }}
          >
            404
          </div>

          {/* Icon */}
          <div className="mb-4">
            <div className="d-inline-block p-4 rounded-circle bg-danger bg-opacity-10">
              <FaExclamationTriangle
                className="text-danger"
                style={{ fontSize: "3rem" }}
              />
            </div>
          </div>

          {/* Title */}
          <h2 className="display-5 fw-bold mb-3">Oops! Page Not Found</h2>

          {/* Description */}
          <p className="lead mb-4 text-muted">
            It seems like the page you're trying to access doesn't exist or has
            been moved.
            <br className="d-none d-md-block" />
            If you believe there's an issue, feel free to report it, and we'll
            look into it.
          </p>

          {/* Buttons */}
          <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-5">
            <NavLink
              to="/"
              className="btn btn-lg d-flex align-items-center justify-content-center gap-2 fw-bold"
              style={{
                background: "linear-gradient(135deg, #4361ee, #7209b7)",
                color: "white",
                borderRadius: "50px",
                padding: "0.8rem 2rem",
              }}
            >
              <FaHome /> Return Home
            </NavLink>

            <NavLink
              to="/contactus"
              className="btn btn-lg d-flex align-items-center justify-content-center gap-2 fw-bold"
              style={{
                background: "white",
                color: "#4361ee",
                border: "2px solid #4361ee",
                borderRadius: "50px",
                padding: "0.8rem 2rem",
              }}
            >
              Report Problem
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Error;
