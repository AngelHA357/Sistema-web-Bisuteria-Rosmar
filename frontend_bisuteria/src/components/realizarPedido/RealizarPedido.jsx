import React, { useState, useContext, useEffect } from 'react';
import FormularioDireccion from "./FormDireccion"
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { BarraNavegacion } from '../catalogoProductos/BarraNavegacion';
import { ModalMensaje } from "../modalMensaje/modalMensaje";
import './estilos/realizarPedido.css';

const RealizarPedido = () => {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState("realizarPedido");
  const [formaPago, setFormaPago] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [mensajeModal, setMensajeModal] = useState(false);
  const [direccionSeleccionada, setDireccionSeleccionada] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [direccionesGuardadas, setDireccionesGuardadas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { usuario, token } = useContext(UserContext);

  useEffect(() => {
    if (!usuario || !token) {
      navigate('/');
    }
  }, [usuario, token, navigate]);

  useEffect(() => {
    if (usuario && token) {
      fetchDirecciones();
    } else {
      setIsLoading(false);
    }
  }, [usuario, token]);

  const fetchDirecciones = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const clienteId = usuario.cliente_id;

      if (!clienteId) {
        setError('No se pudo identificar al cliente. Por favor, inicie sesión nuevamente.');
        setIsLoading(false);
        return;
      }

      const url = `http://localhost:3000/api/cliente/${clienteId}/direcciones`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Direcciones obtenidas:', data);
        setDireccionesGuardadas(data);
      } else {
        console.error('Error al cargar direcciones:', data.message);
        setError('No se pudieron cargar las direcciones. ' + data.message);
        setDireccionesGuardadas([]);
      }
    } catch (error) {
      console.error('Error al consultar direcciones:', error);
      setError('Error de conexión: ' + error.message);
      setDireccionesGuardadas([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormaPagoClick = (tipo) => {
    setFormaPago(tipo)
    if (tipo === "presencial") {
      setDireccionSeleccionada(null)
    }
  }

  const handleDireccionClick = (id) => {
    setDireccionSeleccionada(id)
  }

  const handleNuevaDireccion = () => {
    setMostrarFormulario(true)
  }

  const handleGuardarDireccion = async (nuevaDireccion) => {
    try {
      const clienteId = usuario.cliente_id;

      if (!clienteId) {
        alert('No se pudo identificar al cliente. Por favor, inicie sesión nuevamente.');
        return;
      }

      const response = await fetch('http://localhost:3000/api/direccion', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...nuevaDireccion,
          idCliente: clienteId
        })
      });

      const data = await response.json();
      if (response.ok) {
        await fetchDirecciones();
        const nuevaDireccionId = data.id;
        if (nuevaDireccionId) {
          setDireccionSeleccionada(nuevaDireccionId);
        }
      } else {
        alert('Error al guardar la dirección: ' + (data.message || 'Error desconocido'));
      }
    } catch (error) {
      alert('Error al guardar la dirección: ' + error.message);
    } finally {
      setMostrarFormulario(false);
    }
  };

  const handleCancelarFormulario = () => {
    setMostrarFormulario(false)
  }
  const direccionElegida = direccionesGuardadas.find((dir) => dir.id === direccionSeleccionada)

  const handleContinuar = async () => {
    try {
      if (formaPago === "presencial") {
        const datosPedido = {
          idCliente: usuario.cliente_id,
          idDireccion: 1, // ID de la dirección de la administradora
          metodoPago: "Efectivo"
        };

        const respuesta = await crearPedido(datosPedido);

        if (respuesta.ok) {
          const pedidoCreado = await respuesta.json();

          setMensajeModal("¡Pedido creado con éxito!");
          setModalOpen(true);

          setTimeout(() => {
            setModalOpen(false);
            setCurrentScreen("resumenPedido");
            navigate('/resumenPedido', {
              state: {
                idPedido: pedidoCreado.id,
                metodoPago: "Presencial"
              }
            });
          }, 2000);
        } else {
          const error = await respuesta.json();
          alert("Error al crear el pedido: " + (error.message || "Error desconocido"));
        }
      }

      else if (formaPago === "transferencia") {
        if (!direccionElegida) {
          alert("Por favor, selecciona una dirección válida");
          return;
        }

        const datosPedido = {
          idCliente: usuario.cliente_id,
          idDireccion: direccionElegida.id,
          metodoPago: "Transferencia"
        };

        const respuesta = await crearPedido(datosPedido);

        if (respuesta.ok) {
          const pedidoCreado = await respuesta.json();

          setMensajeModal("¡Pedido creado con éxito!");
          setModalOpen(true);

          setTimeout(() => {
            setModalOpen(false);
            setCurrentScreen("resumenPedido");
            navigate('/resumenPedido', {
              state: { 
                idPedido: pedidoCreado.id,
                metodoPago: "Transferencia",
                direccion: direccionElegida 
              }
            });
          }, 2000);
        } else {
          const error = await respuesta.json();
          alert("Error al crear el pedido: " + (error.message || "Error desconocido"));
        }
      } else {
        alert("Por favor, selecciona un método de pago");
      }
    } catch (error) {
      console.error("Error al procesar el pedido:", error);
      alert("Error al procesar el pedido: " + error.message);
    }
  };

  const crearPedido = async (datosPedido) => {
    return fetch('http://localhost:3000/api/pedido', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosPedido)
    });
  };

  return (
    <>
      <div className="realizar-pedido-page">
        <BarraNavegacion />
        <div className="realizar-pedido-container">
          <h1 className='titulo'>Elegir domicilio y pago</h1>

          <div className="realizar-pedido-content">
            <div className="formas-pago">
              <h2 className='subtitulo'>Forma de pago</h2>
              <button
                className={`forma-pago-btn ${formaPago === "presencial" ? "active" : ""}`}
                onClick={() => handleFormaPagoClick("presencial")}
              >
                Pago presencial
              </button>
              <button
                className={`forma-pago-btn ${formaPago === "transferencia" ? "active" : ""}`}
                onClick={() => handleFormaPagoClick("transferencia")}
              >
                Pago por transferencia
              </button>
            </div>

            {/* Columna derecha*/}
            <div className="contenido-derecho">
              {formaPago === "presencial" && (
                <div className="punto-entrega">
                  <h2>Punto de entrega:</h2>
                  <p>Calle Pesqueira #123, Colonia Centro, Navojoa, Sonora, C.P. 85830</p>
                </div>
              )}

              {formaPago === "transferencia" && !mostrarFormulario && (
                <div className="direcciones-container">
                  <h2>Domicilio</h2>
                  <button className="direccion-btn nueva" onClick={handleNuevaDireccion}>
                    Nueva dirección
                  </button>

                  {direccionesGuardadas.map((dir) => (
                    <button
                      key={dir.id}
                      className={`direccion-btn ${direccionSeleccionada === dir.id ? "active" : ""}`}
                      onClick={() => handleDireccionClick(dir.id)}
                    >
                      {dir.calle} {dir.numeroExterior} {dir.numeroInterior && `Int. ${dir.numeroInterior}`}
                    </button>
                  ))}

                  {direccionElegida && (
                    <div className="direccion-detalles">
                      <h3>Detalles de la dirección:</h3>
                      <p className='texto-direccion'>
                        <strong>Calle:</strong> {direccionElegida.calle}
                      </p>
                      <p className='texto-direccion'>
                        <strong>Número exterior:</strong> {direccionElegida.numeroExterior}
                      </p>
                      {direccionElegida.numeroInterior && (
                        <p className='texto-direccion'>
                          <strong>Número interior:</strong> {direccionElegida.numeroInterior}
                        </p>
                      )}
                      <p className='texto-direccion'>
                        <strong>Código Postal:</strong> {direccionElegida.codigoPostal}
                      </p>
                      <p className='texto-direccion'>
                        <strong>Estado:</strong> {direccionElegida.estado}
                      </p>
                      <p className='texto-direccion'>
                        <strong>Ciudad:</strong> {direccionElegida.ciudad}
                      </p>
                      <p className='texto-direccion'>
                        <strong>Colonia:</strong> {direccionElegida.colonia}
                      </p>
                    </div>
                  )}

                  <div className="nota-transferencia">
                    <h3>Nota:</h3>
                    <p>
                      Mandar comprobante de transferencia después de completar la compra al siguiente correo:
                      <br />
                      bisuteria_rosmar@gmail.com
                    </p>
                  </div>
                </div>
              )}

              {formaPago === "transferencia" && mostrarFormulario && (
                <div className="formulario-container">
                  <h2 className='subtitulo'>Domicilio</h2>
                  <h3 className='subsubtitulo'>Nueva dirección</h3>
                  <FormularioDireccion onGuardar={handleGuardarDireccion} onCancelar={handleCancelarFormulario} />
                </div>
              )}
            </div>
          </div>

          {formaPago && (formaPago === "presencial" || (formaPago === "transferencia" && direccionSeleccionada)) && (
            <div className="confirmar-container">
              <button className="confirmar-btn" onClick={handleContinuar}>
                Confirmar
              </button>
            </div>
          )}
        </div>
        <ModalMensaje
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          mensaje={mensajeModal}
        />
      </div>
    </>
  )
}

export default RealizarPedido;
