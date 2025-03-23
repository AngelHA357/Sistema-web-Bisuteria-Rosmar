import React, { useEffect, useState } from "react";
import "./estilos/tarjetaProductoCart.css";

export function TarjetaProductoCart({ producto, cantidad }) {
  const categorias = {
    1: "Collares",
    2: "Aretes",
    3: "Pulseras",
    4: "Otros",
  };

  const removerProducto = () => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    
    const nuevoCarrito = carritoGuardado.filter((item) => item.id != producto.id);
    
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  
    window.dispatchEvent(new Event("storage"));

    alert("Producto removido del carrito");
  };

  return (
    <div className="producto-card-cart">
      <img src={producto.imagenes[2]} alt={producto.nombre} className="producto-imagen-cart" />
      <div className="producto-info-cart">
        <h3>{producto.nombre}</h3>
        <div className="categoria-cantidad">
          <p className="categoria"><u>{categorias[producto.categoria_id] || "Desconocido"}</u></p>
          <p className="cantidad">({cantidad})</p>
        </div>
      </div>
      <p className="remover" onClick={removerProducto}>Remover</p>
    </div>
  );
}