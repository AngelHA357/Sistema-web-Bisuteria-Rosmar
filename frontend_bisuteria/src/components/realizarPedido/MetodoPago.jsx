import React, { useState } from 'react';
import FormDireccion from './FormDireccion';
import './estilos/metodoPago.css';

const MetodoPago = ({ seleccionarMetodo, setSeleccionarMetodo, onConfirm }) => {
  const [mostrarFormDireccion, setMostrarFormDireccion] = useState(false);

  const handleMetodoSeleccionado = (metodo) => {
    setSeleccionarMetodo(metodo);
    if (metodo === 'transferencia') {
        setMostrarFormDireccion(true);
    } else {
        setMostrarFormDireccion(false);
    }
  };

  const handleEnviarDireccion = (direccionData) => {
    onConfirm({ 
      metodoPago: seleccionarMetodo,
      direccion: direccionData,
    });
  };

  return (
    <div>
      <h2 className="title">Elegir domicilio y pago</h2>
      <div className="form-section">
        <div className="form-group">
          <h3>Forma de pago</h3>
          <div className="payment-methods">
            <button
              className={`payment-button ${seleccionarMetodo === 'presencial' ? 'selected' : ''}`}
              onClick={() => handleMetodoSeleccionado('presencial')}
            >
              Pago presencial
            </button>
            <button
              className={`payment-button ${seleccionarMetodo === 'transferencia' ? 'selected' : ''}`}
              onClick={() => handleMetodoSeleccionado('transferencia')}
            >
              Pago por transferencia
            </button>
          </div>
        </div>
        {seleccionarMetodo === 'presencial' && (
          <div className="form-group">
            <h3>Punto de entrega</h3>
            <p>(dirección de la administradora)</p>
          </div>
        )}
        {seleccionarMetodo === 'transferencia' && (
          <FormDireccion onSubmit={handleEnviarDireccion} />
        )}
      </div>
    </div>
  );
};

export default MetodoPago;