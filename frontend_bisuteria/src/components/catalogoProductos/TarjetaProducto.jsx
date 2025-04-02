import React from "react";
import "./estilos/tarjetaProductoStyles.css";
import { useNavigate } from 'react-router-dom';

export function TarjetaProducto({ image, name, price, category, productId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/producto/${productId}`);
    window.scrollTo(0, 0);
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