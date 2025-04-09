import React from "react";
import "./estilos/tarjetaProductoStyles.css";
import { useNavigate } from 'react-router-dom';

export function TarjetaProducto({ image, name, price, category, productId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (productId) {
      navigate(`/producto/${productId}`);
      window.scrollTo(0, 0);
    } else {
      console.error("Product ID is undefined or invalid");
    }
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="image-container">
        <img src={image} alt={name} />
      </div>
      <div className="product-info">
        <h3>{name}</h3>
        <p className="price">${price}</p>
        <p className="category">{category || "Desconocido"}</p>
      </div>
    </div>
  );
}
