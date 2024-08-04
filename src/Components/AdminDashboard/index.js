import React, { useEffect, useState } from "react";
import { getingProducts } from "../../config/fireBase";
import Footer from "../ClientDashboard/Footer";
import Card from "./ProductCard";
import Navbar from "./Navbar";

function AdminDashboard() {
  const [products, setProducts] = useState("");
  useEffect(() => {
    allProducts();
  }, []);
  const allProducts = async () => {
    const all_Products = await getingProducts();
    setProducts(all_Products);
  };
  return (
    <div>
      <Navbar />
      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
          letterSpacing: "1px",
          fontSize: "60px",
          fontWeight: "bold",
          textDecoration: "underline",
          textShadow: "0 0 20px gray",
        }}
      >
        All Products
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {products ? (
          products.map((item) => (
            <Card
              key={item.id}
              image={item.image}
              title={item.title}
              description={item.description}
              amount={item.price}
              id={item.productId}
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

export default AdminDashboard;
