import React, { useState, useEffect } from "react";
import "./clientDashboard.css";
import Card from "./Card";
import { getingProducts } from "../../config/fireBase";
import Navbar from "./Navbar";
import Footer from "./Footer";

function ClientDashoard() {
  const [products, setProducts] = useState("");
  const [id, setId] = useState(null);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"));
    setId(userId.id);

    allProducts();
  }, []);
  const allProducts = async () => {
    const all_products = await getingProducts();
    setProducts(all_products);
  };

  return (
    <div>
      <Navbar />
      <h1 className="main_heading">All Products</h1>
      <div className="product_div">
        {products ? (
          products.map((product, index) => (
            <Card
              key={index}
              id={product.productId}
              image={product.image}
              title={product.title}
              description={product.description}
              amount={product.price}
            />
          ))
        ) : (
          <img
            style={{
              width: "100%",
              height: "100%",
            }}
            alt=""
            src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1262.gif"
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ClientDashoard;
