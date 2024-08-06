import React, { useEffect, useState } from "react";
import { allOrders } from "../../../config/fireBase";
import Card from "./OrderCard";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import "./myOrder.css";

function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const user_Id = user.id;
    setUserId(user_Id);

    myOrder();
  }, [orders]);

  const myOrder = async () => {
    const all_Orders = await allOrders();
    const totalOrders = all_Orders.filter((ordr) => {
      return ordr.userId === userId;
    });
    setOrders(totalOrders);
  };

  return (
    <div className="OrderContainer">
      <h2 className="navHead">My Orders</h2>
      <div>
        {orders ? (
          orders.map((order) => {
            return <Card order={order} />;
          })
        ) : (
          <div>
            <h1 className="container-text">You have no Orders yet.</h1>
            <div className="main-div">
              <button
                className="linkBtn"
                onClick={() => navigate("/clientdashboard")}
              >
                Order Now <FaArrowRightLong className="arrow" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
