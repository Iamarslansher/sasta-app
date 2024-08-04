import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            We are a leading e-commerce platform offering a wide range of
            products and services.
          </p>
        </div>
        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li>FAQ</li>
            <li>Returns & Refunds</li>
            <li>Shipping Info</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
            <FaYoutube />
          </div>
        </div>
        <div className="footer-section">
          <h3>Contact Information</h3>
          <p>
            <MdEmail /> iamarslansher@gmail.com
          </p>
          <p>
            <MdPhone /> 0307-2973307
          </p>
          <p>
            <MdLocationOn /> 123 Main St, City, Country
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Folio3. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
