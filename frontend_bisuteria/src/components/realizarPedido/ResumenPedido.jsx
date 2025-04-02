import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { BarraNavegacion } from '../catalogoProductos/BarraNavegacion';
import "./estilos/resumenPedido.css" 

const ResumenPedido = () => {
    const location = useLocation();
    const { idPedido, metodoPago, direccion } = location.state || {};
    const { token } = useContext(UserContext);
    const navigate = useNavigate();
    
    const [datosPedido, setDatosPedido] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (idPedido) {
        obtenerDetallesPedido();
      } else {
        setError('No se encontró información del pedido');
        setIsLoading(false);
      }
    }, [idPedido]);
  
    const obtenerDetallesPedido = async () => {
      try {
        setIsLoading(true);
        setError(null);
  
        const response = await fetch(`http://localhost:3000/api/pedido/${idPedido}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        const data = await response.json();
  
        if (response.ok) {
          console.log('Detalles del pedido:', data);
          setDatosPedido(data);
        } else {
          console.error('Error al cargar detalles del pedido:', data.message);
          setError('No se pudieron cargar los detalles del pedido. ' + data.message);
        }
      } catch (error) {
        console.error('Error al consultar detalles del pedido:', error);
        setError('Error de conexión: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleConfirmar = () => {
      navigate('/catalogo');
    };

  
    if (isLoading) return <div className="loading">Cargando detalles del pedido...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!datosPedido) return <div className="error">No se encontraron datos del pedido</div>;
  
    const domicilioFormateado = direccion ? 
      `${direccion.calle} ${direccion.numeroExterior}${direccion.numeroInterior ? `, Int. ${direccion.numeroInterior}` : ''}` : 
      '';
  
    return (
      <div className="resumen-pedido-page">
        <BarraNavegacion />
        <div className="resumen-pedido-container">
          <h1 className="titulo">Resumen de pedido</h1>
          
          <div className="resumen-content">
            <div className="resumen-item">
              <span className="resumen-label">Productos ({datosPedido.total_productos})</span>
              <span className="resumen-value">${datosPedido.subtotal.toFixed(2)}</span>
            </div>
            
            <div className="resumen-item">
              <span className="resumen-label">Envío</span>
              <span className="resumen-value">${datosPedido.envio.toFixed(2)}</span>
            </div>
            
            <div className="resumen-item total">
              <span className="resumen-label">Total</span>
              <span className="resumen-value">${datosPedido.total.toFixed(2)}</span>
            </div>
            
            <div className="resumen-separator"></div>
            
            <div className="resumen-item">
              <span className="resumen-label">Tipo de pago</span>
              <span className="resumen-value">{metodoPago}</span>
            </div>
            
            {metodoPago === "Transferencia" && domicilioFormateado && (
              <div className="resumen-item">
                <span className="resumen-label">Domicilio</span>
                <span className="resumen-value">{domicilioFormateado}</span>
              </div>
            )}
            
            {metodoPago === "Presencial" && (
              <div className="resumen-item">
                <span className="resumen-label">Punto de entrega</span>
                <span className="resumen-value">(dirección de la administradora)</span>
              </div>
            )}
            
            <div className="confirmar-container">
              <button className="confirmar-btn" onClick={handleConfirmar}>Confirmar</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ResumenPedido;