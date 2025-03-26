import React, { useState } from 'react';
import FormularioDireccion from "./FormDireccion"
import ResumenPedido from './resumenPedido';
import './estilos/realizarPedido.css';

const RealizarPedido = () => {
  const [currentScreen, setCurrentScreen] = useState("realizarPedido")
  const [formaPago, setFormaPago] = useState("")
  const [direccionSeleccionada, setDireccionSeleccionada] = useState(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const [direccionesGuardadas, setDireccionesGuardadas] = useState([
    {
      id: 1,
      calle: "Calle Principal",
      numeroExterior: "123",
      numeroInterior: "4B",
      codigoPostal: "12345",
      estado: "CDMX",
      ciudad: "Ciudad de México",
      colonia: "Centro",
      indicaciones: "Edificio azul",
    },
    {
      id: 2,
      calle: "Avenida Secundaria",
      numeroExterior: "456",
      numeroInterior: "",
      codigoPostal: "67890",
      estado: "Jalisco",
      ciudad: "Guadalajara",
      colonia: "Moderna",
      indicaciones: "Casa blanca",
    },
  ])


  const resumenData = {
    productos: { cantidad: 2, total: 69.99 },
    envio: 70.0,
    total: 139.99,
  }

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

  const handleGuardarDireccion = (nuevaDireccion) => {
    const newId = direccionesGuardadas.length > 0 ? Math.max(...direccionesGuardadas.map((d) => d.id)) + 1 : 1

    const direccionConId = {
      id: newId,
      ...nuevaDireccion,
    }

    setDireccionesGuardadas([...direccionesGuardadas, direccionConId])
    setDireccionSeleccionada(direccionConId.id)
    setMostrarFormulario(false)
  }

  const handleCancelarFormulario = () => {
    setMostrarFormulario(false)
  }

  const handleContinuar = () => {
    setCurrentScreen("resumenPedido")
  }

  const handleVolver = () => {
    setCurrentScreen("realizarPedido")
  }

  const direccionElegida = direccionesGuardadas.find((dir) => dir.id === direccionSeleccionada)

  if (currentScreen === "resumenPedido") {
    return (
      <ResumenPedido
        resumenData={resumenData}
        formaPago={formaPago}
        direccionSeleccionada={direccionSeleccionada}
        direccionesGuardadas={direccionesGuardadas}
        onVolver={handleVolver}
      />
    )
  }

  return (
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

        {/* Columna derecha - Contenido dinámico */}
        <div className="contenido-derecho">
          {formaPago === "presencial" && (
            <div className="punto-entrega">
              <h2>Punto de entrega:</h2>
              <p>(dirección de la administradora)</p>
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
                  {direccionElegida.indicaciones && (
                    <p className='texto-direccion'>
                      <strong>Indicaciones extras:</strong> {direccionElegida.indicaciones}
                    </p>
                  )}
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
  )
}

export default RealizarPedido;
