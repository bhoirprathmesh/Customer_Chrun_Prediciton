import React from 'react';
import { NavLink } from 'react-router-dom';

function Error() {
  return (
    <>
      <section id="error-page" className="error-page" style={{ backgroundColor: "#f1f1f1", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="content text-center" style={{ backgroundColor: "white", padding: "40px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
          <h2 className="header animated-404" style={{ color: "#007bff" }}>404</h2>
          <h4 className="fade-in fw-bold" style={{ color: "#333" }}>Sorry! Page not found</h4>
          <p className="fade-in fs-4" style={{ color: "#666" }}>
            Oops! It seems like the page you're trying to access doesn't exist.
            <br />
            If you believe there's an issue, feel free to report it, and we'll
            look into it.
          </p>
          <div className="btns">
            <NavLink to="/" className="btn btn-return" aria-label="Return to home" style={{ margin: "10px", backgroundColor: "#007bff", color: "white", padding: "10px 20px", borderRadius: "5px", textDecoration: "none" }}>Return Home</NavLink>
            <NavLink to="/contactus" className="btn btn-report" aria-label="Report problem" style={{ margin: "10px", backgroundColor: "#007bff", color: "white", padding: "10px 20px", borderRadius: "5px", textDecoration: "none" }}>Report Problem</NavLink>
          </div>
        </div>
      </section>
    </>
  );
}

export default Error;
