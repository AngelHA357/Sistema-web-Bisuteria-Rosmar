import React, { useEffect, useState, useContext } from "react";
import "./estilos/tarjetaProductoCart.css";
import { ModalMensaje } from "../modalMensaje/modalMensaje";
import { UserContext } from "../../context/UserContext";

export function TarjetaProductoCart({ producto, cantidad }) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const { usuario } = useContext(UserContext);

  const removerProducto = async () => {
    try {
      if (!usuario) {
        throw new Error("Usuario no disponible");
      }

      const response = await fetch(`http://localhost:3000/api/carrito/quitarUno`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idCliente: usuario.cliente_id,
          idProducto: producto.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al quitar producto del carrito");
      }

      setModalAbierto(true);
    } catch (error) {
      console.error("Error al remover producto:", error);
    }
  };

  const handleCloseModal = () => {
    setModalAbierto(false);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="producto-card-cart">
      <img
        src={
          producto.imagenes && producto.imagenes.length > 0
            ? producto.imagenes[0]
            : "default-image.jpg"
        }
        alt={producto.nombre}
        className="producto-imagen-cart"
      />
      <div className="producto-info-cart">
        <h3>{producto.nombre}</h3>
        <div className="categoria-cantidad">
          <p className="categoria">
            <u>{producto.categoria.nombre || "Desconocido"}</u>
          </p>
          <p className="cantidad">({cantidad})</p>
        </div>
      </div>
      <p className="remover" onClick={removerProducto}>
        Remover
      </p>

      <ModalMensaje
        isOpen={modalAbierto}
        onClose={handleCloseModal}
        mensaje="Producto eliminado con éxito"
      />
    </div>
  );
}
