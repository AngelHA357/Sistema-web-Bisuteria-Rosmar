import React from "react";
import "./estilos/tarjetaProductoStyles.css";
import { useNavigate } from 'react-router-dom';

export function TarjetaProducto({ image, name, price, category, productId }) {
  console.log("Product ID being passed:", productId);
  const navigate = useNavigate();

  const handleClick = () => {
    // Make sure productId is valid before navigation
    if (productId) {
      console.log("Navigating to product with ID:", productId);
      navigate(`/producto/${productId}`);
      window.scrollTo(0, 0);
    } else {
      console.error("Product ID is undefined or invalid");
    }
  };


  return (
    <div className="product-card" onClick={handleClick}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p className="price">${price}</p>
      <p className="category">{category || "Desconocido"}</p>
    </div>
  );
}