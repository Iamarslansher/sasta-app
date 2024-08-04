import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getingProducts, orderDetails } from "../../../config/fireBase";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaCreditCard,
  FaMoneyBillWave,
} from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import Swal from "sweetalert2";
import "./buyProduct.css";

const BuyProduct = () => {
  const loction = useLocation();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");
  const [userId, setUserId] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProducts] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const deliveryCharg = 135;
  const navigate = useNavigate();
  // const totalAmount = selectedProduct.price + deliveryCharg;

  useEffect(() => {
    setId(loction.state.productId);
    setUserId(JSON.parse(localStorage.getItem("user")).id);
    AllProducts();
  });

  const AllProducts = async () => {
    const getingAllProducts = await getingProducts();
    setProducts(getingAllProducts);

    products.map((item) => {
      if (item.productId === id) {
        setTitle(item.title);
        setPrice(item.price);
        setImage(item.image);
        // return setSelectedProducts(item);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await orderDetails(
      {
        name,
        contact,
        location,
        paymentMethod,
        userId,
        productId: id,
        price,
        title,
        image,
      },
      navigate
    );
  };

  return (
    <div className="buy-product-container">
      <motion.div
        className="product-info"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src={image} alt="Product" />
        <h2>{title}</h2>
        <p className="price">Rs. {price}/-</p>
      </motion.div>
      <motion.div
        className="user-form"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2>Complete Your Purchase</h2>
        <form onSubmit={handleSubmit}>
          <motion.div
            className="input-group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </motion.div>
          <motion.div
            className="input-group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPhone className="icon" />
            <input
              type="tel"
              placeholder="Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </motion.div>
          <motion.div
            className="input-group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaMapMarkerAlt className="icon" />
            <input
              type="text"
              placeholder="Delivery Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </motion.div>
          <div className="payment-method">
            <h3>Payment Method</h3>
            <motion.div
              className="radio-group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <input
                type="radio"
                id="cod"
                name="payment"
                value="cod"
                onChange={() => setPaymentMethod("cash on delivery")}
                required
              />
              <label htmlFor="cod">
                <FaMoneyBillWave /> Cash on Delivery
              </label>
            </motion.div>
            <motion.div
              className="radio-group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <input
                type="radio"
                id="card"
                name="payment"
                value="card"
                onChange={() => setPaymentMethod("Credit/Debit Card")}
              />
              <label htmlFor="card">
                <FaCreditCard /> Credit/Debit Card
              </label>
            </motion.div>
            <label
              htmlFor="card"
              style={{
                display: "block",
              }}
            >
              <CiDeliveryTruck /> Delivery Charges: Rs. {deliveryCharg} /-
            </label>
            {/* <label htmlFor="card">
              <CiDeliveryTruck /> Total Amount: Rs.
              <CiDeliveryTruck /> Total Amount: Rs. {totalAmount} /-
            </label> */}
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Place Order
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default BuyProduct;
