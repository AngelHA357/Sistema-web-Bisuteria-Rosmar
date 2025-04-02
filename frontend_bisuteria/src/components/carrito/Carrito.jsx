import React, { useState, useEffect, useContext } from "react";
import "./estilos/carrito.css";
import { TarjetaProductoCart } from "./TarjetaProductoCart";
import { ModalMensaje } from "../modalMensaje/modalMensaje";
import { UserContext } from '../../context/UserContext';

export function Carrito() {
  const { usuario, token } = useContext(UserContext);
  const [modalQuitar, setModalQuitar] = useState(false);
  const [modalComprar, setModalComprar] = useState(false);
  const [carrito, setCarrito] = useState({ listado: [], total: 0 });

  const obtenerCarrito = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/cliente/${encodeURIComponent(usuario.cliente_id)}/carrito`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
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
    if (usuario && usuario.cliente_id && token) {
      obtenerCarrito();
      
      const handleStorageChange = async () => {
        await obtenerCarrito();
      };
      
      window.addEventListener("storage", handleStorageChange);
      
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, [usuario, token]); 

  const removerTodos = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/cliente/${usuario.cliente_id}/carritoVaciar`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
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
