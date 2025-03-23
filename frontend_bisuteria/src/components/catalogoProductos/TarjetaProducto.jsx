import React from "react";
import "./estilos/tarjetaProductoStyles.css";
import { useNavigate } from 'react-router-dom';

export function TarjetaProducto({ image, name, price, category, productId }) {
  const navigate = useNavigate();
  const categorias = {
    1: "Collares",
    2: "Aretes",
    3: "Pulseras",
    4: "Otros",
  };

  const handleClick = () => {
    navigate(`/producto/${productId}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p className="price">${price}</p>
      <p className="category">{categorias[category] || "Desconocido"}</p>
    </div>
  );
}