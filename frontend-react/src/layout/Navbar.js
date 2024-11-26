import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Images/Logo.png";
import "../App.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg"style={{ backgroundColor: "#083e54" }}>
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt="logo" style={{ height: "40px" }} />
        </Link>

        {/* Navigation Links */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/vote/1">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Add User
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/edituser/1">
                Edit User
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/viewuser/1">
                View User
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
