import React, { useEffect, useState } from "react";
import { allOrders } from "../../../config/fireBase";
import Card from "./OrderCard";
import { Link } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    setUserId(userId);

    myOrders();
  }, []);

  const myOrders = async () => {
    const all_Orders = await allOrders();

    const totalOrders = all_Orders.filter((order) => {
      return order.userId === userId;
    });

    setOrders(totalOrders);
  };

  if (!orders) {
    return <img src="https://i.gifer.com/HMoD.gif" alt="" />;
  }

  return (
    <>
      <h2
        style={{
          textAlign: "center !important",
          marginTop: "10px",
          color: "gray",
          fontSize: "28px",
          fontWeight: "bold",
          borderBottom: "2px solid #ccc",
          paddingBottom: "10px",
          marginBottom: "20px",
          paddingTop: "10px",
          paddingLeft: "10px",
          paddingRight: "10px",
          backgroundColor: "#f7f7f7",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
          borderRadius: "5px",
          overflow: "hidden",
          width: "100%",
          cursor: "pointer",
        }}
      >
        My Orders
      </h2>
      <div>
        {orders ? (
          orders.map((order) => {
            return <Card order={order} />;
          })
        ) : (
          <>
            <h1
              style={{
                textAlign: "center",
                marginTop: "100px",
                color: "gray",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              You have no Orders yet.
            </h1>
            <Link to="/clientdashboard">Order Now</Link>
          </>
        )}
      </div>
    </>
  );
}

export default MyOrders;
