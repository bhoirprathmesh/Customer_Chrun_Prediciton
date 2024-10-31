import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'; 
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../store/auth';

function Header() {

  const { isLoggedIn } = useAuth();

  const [locations, setLocation] = useState('');

  const LogoutHandler = () => {
    localStorage.removeItem("token");
    toast.success("Logout Success", { position: "top-right", autoClose: 2000 });
    navigator("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-blue shadow bottom-shadow px-lg-3 py-lg-2 shadow-sm sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand me-5 fw-bold fs-2 h-font" href="/">Churn<span className='text-primary'>Prediction</span></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon shadow-none"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className={({isActive}) => 
                  `nav-link me-2 fs-5 a ${isActive ? "text-primary fw-bold" : "text-body" }`
                }>Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/services" className={({isActive}) => 
                    `nav-link me-2 fs-5 a ${isActive ? "text-primary fw-bold" : "text-body" }`
                  }>Services
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/prediction" className={({isActive}) => 
                    `nav-link me-2 fs-5 a ${isActive ? "text-primary fw-bold" : "text-body" }`
                  }>Prediction
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contactus" className={({isActive}) => 
                    `nav-link me-2 fs-5 a ${isActive ? "text-primary fw-bold" : "text-body" }`
                  }>Contact us
              </NavLink>
            </li>
          </ul>
          
          <div className="d-flex">
          {isLoggedIn ? (
            <>
              <div className="d-flex">
                <Link to="/" onClick={LogoutHandler} className="btn btn-outline-dark shadow-none me-lg-3 me-2 text-primary b fw-bold">LOG OUT</Link>
              </div>
            </>
          ) : (
            <>
              <div className="d-flex">
                <Link to="/register" className="btn btn-outline-dark shadow-none me-lg-3 me-2 text-primary b fw-bold">SIGNIN</Link>
              </div>
            </>
          )}
        </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
