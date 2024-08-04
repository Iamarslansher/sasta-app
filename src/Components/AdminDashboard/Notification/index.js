import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaPlus,
  FaFlag,
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { allOrders } from "../../../config/fireBase.js";
import "./notification.css";

const Notification = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getingAllOrders();
  }, []);

  const getingAllOrders = async () => {
    const all_Orders = await allOrders();
    setOrders(all_Orders);
  };

  return (
    <div className="notificationPage">
      <div className="sidebarContainer">
        <motion.div
          className="sidebar"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            onClick={() => navigate("/admindashboard")}
            className="sidebarItem"
          >
            <FaHome /> <span>Home</span>
          </div>
          <div onClick={() => navigate("/cardform")} className="sidebarItem">
            <FaPlus /> <span>Add Product</span>
          </div>
          <div className="sidebarItem">
            <FaFlag /> <span>Report</span>
          </div>
          <div
            onClick={() => navigate("/updateprofile")}
            className="sidebarItem"
          >
            <FaUser /> <span>Profile</span>
          </div>
        </motion.div>
      </div>
      <div className="mainContent">
        <h1>Recent Orders</h1>
        <div className="ordersList">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              className="orderCard"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={order.image}
                alt={order.title}
                className="productImage"
              />
              <div className="orderDetails">
                <h2>{order.title}</h2>
                <p className="username">{order.name}</p>
                <p className="price">Rs. {order.price}/-</p>
                <p className="address">
                  <FaMapMarkerAlt /> {order.location}
                </p>
                <p className="date">
                  <FaCalendarAlt /> {order.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
