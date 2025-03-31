import React from 'react';
import './estilos/carrito.css';
import productos from "../../mocks/productos.json";
import { TarjetaProductoCart } from "./TarjetaProductoCart";
import { useState, useEffect } from "react";
import { ModalMensaje } from "../modalMensaje/modalMensaje";

export function Carrito() {
  const [modalQuitar, setModalQuitar] = useState(false);
  const [modalComprar, setModalComprar] = useState(false);
  const [carrito, setCarrito] = useState(
    JSON.parse(localStorage.getItem("carrito")) || []
  );

  const totalProductos = carrito.length;
  const totalPrecio = carrito.reduce((acc, item) => {
    const producto = productos.find((p) => p.id == item.id);
    return producto ? acc + producto.precio * item.cantidad : acc;
  }, 0);
  const costoEnvio = totalPrecio > 0 ? 70.0 : 0;

  useEffect(() => {
    const handleStorageChange = () => {
      const nuevoCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
      setCarrito(nuevoCarrito);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
        window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const removerTodos = () => {
    localStorage.removeItem('carrito');
    window.dispatchEvent(new Event("storage"));
    setModalQuitar(true);
  }

  const comprar = () => {
    localStorage.removeItem('carrito');
    window.dispatchEvent(new Event("storage"));
    setModalComprar(true);
  }

  return (
    <div className="carrito-container">
      <h2>Carrito de compras</h2>
      <div className="carrito-content">
        <div className="productos-lista">
          <div className="carrito-header">
            <p>{carrito.length} {carrito.length === 1 ? "producto" : "productos"}</p>
            {carrito.length > 0 && (
              <p className="remover-todos" onClick={removerTodos}>
                Quitar todo
              </p>
            )}
          </div>
          {carrito.length > 0 ? (
            carrito.map((item) => {
              const producto = productos.find((p) => p.id == item.id);
              return producto ? (
                <TarjetaProductoCart
                  key={item.id}
                  producto={producto}
                  cantidad={item.cantidad}
                />
              ) : null;
            })
          ) : (
            <p className="carrito-vacio">Tu carrito está vacío</p>
          )}
        </div>

        {carrito.length > 0 ? (
          <div className="resumen-compras">
            <h3>Resumen de compras</h3>
            <p>
              Productos ({totalProductos}) <span>${totalPrecio.toFixed(2)}</span>
            </p>
            <p>
              Envío <span>${costoEnvio.toFixed(2)}</span>
            </p>
            <p className="total">
              Total <span>${(totalPrecio + costoEnvio).toFixed(2)}</span>
            </p>
            <button
              className="continuar-compra"
              disabled={carrito.length == 0}
              onClick={comprar}
            >
              Continuar compra
            </button>
          </div>
        ) : ( "")}
      </div>

      <ModalMensaje 
          isOpen={modalQuitar} 
          onClose={() => setModalQuitar(false)} 
          mensaje="Se han removido todos los productos del carrito" 
      />

      <ModalMensaje 
          isOpen={modalComprar} 
          onClose={() => setModalComprar(false)} 
          mensaje="Compra realizada con éxito" 
      />
    </div>
  );
}
