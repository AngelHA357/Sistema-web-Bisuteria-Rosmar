import React from 'react';
import './estilos/tarjetaProductoStyles.css';

export function TarjetaProducto({ image, name, price, category}) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p className="price">{price}</p>
      <p className="category">{category}</p>
    </div>
  );
}