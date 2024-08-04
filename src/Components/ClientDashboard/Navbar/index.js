import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../../assets/profileImg.png";
import logo from "../../../assets/logo.jpg";
import "./navbar.css";

import { FaUser, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { GiNotebook } from "react-icons/gi";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState("");

  useEffect(() => {
    const crntUser = JSON.parse(localStorage.getItem("user"));
    setProfile(crntUser.profileImgUrl);
    setUser(crntUser);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="admin-navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>

      <div className="nav-tag">
        <h4>
          <IoCartOutline /> Cart
        </h4>
        <h4 onClick={() => navigate("/myorders")}>
          <GiNotebook /> My Orders
        </h4>
      </div>
      <div className="navbar-profile" ref={dropdownRef}>
        <div className="profile-container" onClick={toggleDropdown}>
          <img
            src={profile ? profile : img}
            alt="Profile"
            className="profile-image"
          />
          <FaChevronDown
            className={`dropdown-icon ${isDropdownOpen ? "open" : ""}`}
          />
        </div>
        {isDropdownOpen && (
          <div className="profile-dropdown">
            <button className="dropdown-item">
              <FaUser /> {user.email}
            </button>
            <button
              onClick={() => navigate("/updateprofile")}
              className="dropdown-item"
            >
              <FaUser /> Update Profile
            </button>
            <button
              onClick={() => navigate("/login")}
              className="dropdown-item"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
