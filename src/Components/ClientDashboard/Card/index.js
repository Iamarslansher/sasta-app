import React, { useState } from "react";
import { GrStatusGood } from "react-icons/gr";
import { IoCartOutline } from "react-icons/io5";
import "./card.css";
import { useNavigate } from "react-router-dom";

const Card = ({ image, title, description, amount, id }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-image-container">
        <img src={image} alt={title} className="card-image" />
      </div>
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <div className="card-amount">Rs. {amount}/-</div>
        <div className="card-actions">
          <button
            onClick={() =>
              navigate("/buyingproduct", {
                state: {
                  productId: id,
                },
              })
            }
            className="card-button delete"
          >
            <GrStatusGood /> Buy
          </button>
          <button className="card-button update">
            <IoCartOutline /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
