import React, { useEffect, useState } from "react";
import {
  FaStar,
  FaUser,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaComments,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./ordercard.css";

const OrderCard = (props) => {
  const { date, name, location, price, title, image } = props.order;
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [ratingNo, setRatingNo] = useState();

  useEffect(() => {
    var rate = `${Math.ceil(Math.random() * 4)}.${Math.ceil(
      Math.random() * 9
    )}`;
    setRatingNo(rate);
  }, []);

  return (
    <div className="order-card-container">
      <motion.div
        className="order-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="image-section">
          <img src={image} alt="Product" />
        </div>
        <div className="details-section">
          <h1>{title}</h1>
          <div className="price">Rs. {price}/-</div>
          <div className="order-info">
            <p>
              <FaUser /> {name}
            </p>
            <p>
              <FaCalendarAlt /> Order Date: {date}
            </p>
            <p>
              <FaMapMarkerAlt /> Delivery Address: {location}
            </p>
          </div>
          <div className="rating">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className="stars" />
            ))}
            <span>({ratingNo})</span>
          </div>
          <motion.button
            onClick={() =>
              navigate("/feedback", {
                state: {
                  props,
                },
              })
            }
            className="feedback-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <FaComments /> {isHovered ? "Leave Feedback" : "Feedback"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderCard;
