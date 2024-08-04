import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../../assets/profileImg.png";
import "./navbar.css";

import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdAddToPhotos, MdFeedback } from "react-icons/md";
import { RiMessage3Fill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) {
      setUser(userInfo);
      setProfile(userInfo.profileImgUrl);
    } else {
      setUser(null);
      setProfile(null);
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbarLogo">
        <Link to="/">Logo</Link>
      </div>
      <ul className="navbarLinks">
        <li>
          <FaHome className="icons" />
          <Link to="/admindashboard">Home</Link>
        </li>
        <li>
          <MdAddToPhotos className="icons" />
          <Link to="/cardform">Add Products</Link>
        </li>
        <li>
          <RiMessage3Fill className="icons" />
          <Link to="/services">Messages</Link>
        </li>
        <li>
          <IoNotifications className="icons" />
          <Link to="/notifications">Notifications</Link>
        </li>
        <li>
          <MdFeedback className="icons" />
          <Link to="/feedbacks">Feedbacks</Link>
        </li>
      </ul>
      <div
        className="navbarProfile"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <img
          src={profile ? profile : img}
          alt="Profile"
          className="profileImage"
        />
        {isDropdownOpen && (
          <div className="profileDropdown">
            <Link to="" className="dropdownItem">
              <FaUser /> {user.email}
            </Link>
            <Link to="/updateprofile" className="dropdownItem">
              <FaUser /> Update Profile
            </Link>
            <Link
              onClick={() => navigate("/login")}
              to="/logout"
              className="dropdownItem"
            >
              <FaSignOutAlt /> Logout
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
