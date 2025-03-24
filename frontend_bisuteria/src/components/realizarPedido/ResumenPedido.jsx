import React, { useState, useEffect } from 'react';
import './estilos/resumenPedido.css';

const ResumenPedido = ({ formData }) => {
  const [pedido, setPedido] = useState({ items: [], total: 0 });
  const [direcciones, setDirecciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPedidodata = async () => {
      try {
        setCargando(true);
        setError(null);

        const pedidoResponse = await fetch('/pedidoData.json');
        if (!pedidoResponse.ok) {
          throw new Error('Error al cargar los datos del pedido');
        }
        const pedidoData = await pedidoResponse.json();
        setPedido(pedidoData);

        const direccionesResponse = await fetch('/direcciones.json');
        if (!direccionesResponse.ok) {
          throw new Error('Error al cargar las direcciones guardadas');
        }
        const direccionData = await direccionesResponse.json();
        setDirecciones(direccionData);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    fetchPedidodata();
  }, []);

  const getNombreDireccion = () => {
    if (!formData.idDireccionSeleccionada) {
      return 'Nueva dirección';
    }
    const seleccionado = direcciones.find((dir) => dir.id === formData.idDireccionSeleccionada);
    return seleccionado ? `Dirección guardada ${seleccionado.id}` : 'Dirección guardada 1';
  };

  if (cargando) {
    return <div className="container"><p className="loading">Cargando...</p></div>;
  }

  if (error) {
    return <div className="container"><p className="error">Error: {error}</p></div>;
  }

  return (
    <div>
      <h2 className="title">Resumen de pedido</h2>
      <div className="summary-section">
        {pedido.items.map((item, index) => (
          <div key={index} className="summary-item">
            <span>{item.descripcion}</span>
            <span>${item.cantidad.toFixed(2)}</span>
          </div>
        ))}
        <div className="summary-item total">
          <span>TOTAL</span>
          <span>${pedido.total.toFixed(2)}</span>
        </div>
      </div>
      <div className="summary-section">
        <div className="summary-item">
          <span>Tipo de pago</span>
          <span>{formData.metodoPago === 'transferencia' ? 'Transferencia' : 'Presencial'}</span>
        </div>
        <div className="summary-item">
          <span>Domicilio</span>
          <span>{getNombreDireccion()}</span>
        </div>
      </div>
      <div className="button-group">
        <button className="action-button primary">Confirmar</button>
      </div>
    </div>
  );
};

export default ResumenPedido;