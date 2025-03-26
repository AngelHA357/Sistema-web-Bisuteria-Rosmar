import "./estilos/resumenPedido.css"

const ResumenPedido = ({ resumenData, formaPago, direccionSeleccionada, direccionesGuardadas, onVolver }) => {
  const direccionElegida = direccionesGuardadas.find((dir) => dir.id === direccionSeleccionada)

  const formatearDireccion = (dir) => {
    if (!dir) return ""

    let direccionCompleta = `${dir.calle} ${dir.numeroExterior}`
    if (dir.numeroInterior) {
      direccionCompleta += `, Int. ${dir.numeroInterior}`
    }
    return direccionCompleta
  }

  return (
    <div className="resumen-pedido-container">
      <h1 className="titulo">Resumen de pedido</h1>

      <div className="resumen-content">
        <div className="resumen-item">
          <span className="resumen-label">Productos ({resumenData.productos.cantidad})</span>
          <span className="resumen-value">${resumenData.productos.total.toFixed(2)}</span>
        </div>

        <div className="resumen-item">
          <span className="resumen-label">Envío</span>
          <span className="resumen-value">${resumenData.envio.toFixed(2)}</span>
        </div>

        <div className="resumen-item total">
          <span className="resumen-label">Total</span>
          <span className="resumen-value">${resumenData.total.toFixed(2)}</span>
        </div>

        <div className="resumen-separator"></div>

        <div className="resumen-item">
          <span className="resumen-label">Tipo de pago</span>
          <span className="resumen-value">{formaPago === "presencial" ? "Presencial" : "Transferencia"}</span>
        </div>

        {formaPago === "transferencia" && direccionElegida && (
          <div className="resumen-item">
            <span className="resumen-label">Domicilio</span>
            <span className="resumen-value">{formatearDireccion(direccionElegida)}</span>
          </div>
        )}
      </div>

      <div className="confirmar-container">
        <button className="confirmar-btn" onClick={() => alert("¡Pedido confirmado!")}>
          Confirmar
        </button>
        <button className="volver-btn" onClick={onVolver}>
          Volver
        </button>
      </div>
    </div>
  )
}

export default ResumenPedido