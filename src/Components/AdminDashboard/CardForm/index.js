import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload, FaCheck } from "react-icons/fa";
import "./cardForm.css";
import { productDetail } from "../../../config/fireBase";

const CardForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setprice] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !price || !image) {
      return alert("Please fill all fields");
    }
    await productDetail({ title, description, price, image }, navigate);
  };

  return (
    <div className="card-form-container">
      <form className="card-form" onSubmit={handleSubmit}>
        <h2>Add New Product</h2>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            onChange={(e) => setprice(e.target.value)}
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image" className="image-upload-label">
            <FaUpload /> Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className="image-upload-input"
            required
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>

        <button type="submit" className="submit-button">
          <FaCheck /> Add Product
        </button>
      </form>
    </div>
  );
};

export default CardForm;
