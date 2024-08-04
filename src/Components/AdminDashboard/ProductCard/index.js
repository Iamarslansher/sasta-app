import React, { useState } from "react";
import {
  FaTrash,
  //  FaEdit
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../../config/fireBase";
import "./productCard.css";
import Swal from "sweetalert2";

const Card = ({ image, title, description, amount, id }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const onDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProduct({ id }, navigate);
        Swal.fire({
          title: "Deleted!",
          text: "Product has been deleted.",
          icon: "success",
        });
      }
    });
  };

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
          <button className="card-button delete" onClick={() => onDelete(id)}>
            <FaTrash /> Delete
          </button>
          {/* <button className="card-button update" onClick={onUpdate}>
            <FaEdit /> Update
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
