import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaStar, FaUser } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { feedback } from "../../../config/fireBase";
import "./feedback.css";

const Feedback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.props.order;
  const { image, userId, name, productId } = data;
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await feedback({
      rating,
      comment,

      userData: { email, image, userId, name, productId },
    });
    setRating(0);
    setComment("");
  };
  return (
    <div className="feedback-container">
      <div className="left-section">
        <div
          onClick={() => navigate("/clientdashboard")}
          className="home-section"
        >
          <FaHome className="home-icon" />
          <h2>Back to Home</h2>
        </div>
        <div className="slider-section">
          <img src={image} alt="Product" />
        </div>
      </div>
      <div className="right-section">
        <h2>Product Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="rating">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={index < rating ? "star active" : "star"}
                onClick={() => setRating(index + 1)}
              />
            ))}
          </div>
          <div className="user-input">
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className="user-icon" />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your feedback here..."
              required
            ></textarea>
          </div>
          <button type="submit">
            Send Feedback <MdSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
