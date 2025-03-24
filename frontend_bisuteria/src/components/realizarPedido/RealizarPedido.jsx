import React, { useState } from 'react';
import MetodoPago from './MetodoPago';
import ResumenPedido from './ResumenPedido';
import './estilos/realizarPedido.css';

const RealizarPedido = () => {
  const [seleccionarMetodo, setSeleccionarMetodo] = useState('');
  const [formData, setFormData] = useState({});
  const [ordenConfirmada, setOrdenConfirmada] = useState(false);

  const handleConfirmacion = (data) => {
    setFormData(data);
    setOrdenConfirmada(true);
  };

  return (
    <div className="rosmar-checkout">
      <div className="checkout-container">
        <div className="left-panel">
          <h1>Elegir domicilio y pago</h1>
          <h2>Forma de pago</h2>
          <button className='payment-methods'>
            Pago presencial
          </button>
          <button className='payment-methods'>
            Pago por transferencia
            </button>
        </div>
      </div>
    </div>
  );
};

export default RealizarPedido;
