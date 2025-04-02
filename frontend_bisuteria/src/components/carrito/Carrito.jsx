import React, { useState, useEffect } from "react";
import "./estilos/carrito.css";
import { TarjetaProductoCart } from "./TarjetaProductoCart";
import { ModalMensaje } from "../modalMensaje/modalMensaje";

export function Carrito() {
  const [modalQuitar, setModalQuitar] = useState(false);
  const [modalComprar, setModalComprar] = useState(false);
  const [carrito, setCarrito] = useState({ listado: [], total: 0 }); // Ahora es un objeto
  const usuario = 6; // CAMBIAR ESTO POR EL ID DEL USUARIO LOGUEADO

  const obtenerCarrito = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/cliente/${usuario}/carrito`);
      if (!response.ok) {
        throw new Error("Error al obtener el carrito");
      }
      const data = await response.json();
      setCarrito(data); // Guardamos directamente el objeto que tiene `listado` y `total`
    } catch (error) {
      console.error(error);
      setCarrito({ listado: [], total: 0 }); // En caso de error, mantenemos el formato correcto
    }
  };

  useEffect(() => {
    obtenerCarrito();

    const handleStorageChange = async () => {
      await obtenerCarrito();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const removerTodos = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/cliente/${usuario}/carritoVaciar`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el carrito");
      }

      await obtenerCarrito();
      window.dispatchEvent(new Event("storage"));
      setModalQuitar(true);
    } catch (error) {
      console.error(error);
    }
  };

  const comprar = () => {
    window.dispatchEvent(new Event("storage"));
    setModalComprar(true);
  };

  const totalProductos = carrito.listado.length;
  const totalPrecio = carrito.total;
  const costoEnvio = totalPrecio > 0 ? 70.0 : 0;

  return (
    <div className="carrito-container">
      <h2>Carrito de compras</h2>
      <div className="carrito-content">
        <div className="productos-lista">
          <div className="carrito-header">
            <p>
              {totalProductos} {totalProductos === 1 ? "producto" : "productos"}
            </p>
            {totalProductos > 0 && (
              <p className="remover-todos" onClick={removerTodos}>
                Quitar todo
              </p>
            )}
          </div>
          {totalProductos > 0 ? (
            carrito.listado.map((item) => (
              console.log(carrito.listado),
              <TarjetaProductoCart
                key={item.producto.id}
                producto={item.producto}
                cantidad={item.cantidad}
              />
            ))
          ) : (
            <p className="carrito-vacio">Tu carrito está vacío</p>
          )}
        </div>

        {totalProductos > 0 ? (
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
            <button className="continuar-compra" onClick={comprar}>
              Continuar compra
            </button>
          </div>
        ) : null}
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
