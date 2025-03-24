import { useState } from "react"
import "./estilos/formDireccion.css"

const FormularioDireccion = ({ onGuardar, onCancelar }) => {
    const [formData, setFormData] = useState({
      direccion: "",
      codigoPostal: "",
      ciudad: "",
      colonia: "",
      indicaciones: "",
    })
  
    const handleChange = (e) => {
      const { name, value } = e.target
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      onGuardar(formData)
    }
  
    return (
      <form className="formulario-direccion" onSubmit={handleSubmit}>
  
        <div className="form-group">
          <label htmlFor="codigoPostal">Código postal:</label>
          <input
            type="text"
            id="codigoPostal"
            name="codigoPostal"
            value={formData.codigoPostal}
            onChange={handleChange}
            required
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="ciudad">Ciudad:</label>
          <input type="text" id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} required />
        </div>
  
        <div className="form-group">
          <label htmlFor="colonia">Colonia:</label>
          <input type="text" id="colonia" name="colonia" value={formData.colonia} onChange={handleChange} required />
        </div>
  
        <div className="form-group">
          <label htmlFor="direccion">Dirección:</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="indicaciones">Indicaciones extras:</label>
          <input
            type="text"
            id="indicaciones"
            name="indicaciones"
            value={formData.indicaciones}
            onChange={handleChange}
          />
        </div>
  
        <div className="form-actions">
          <button type="submit" className="guardar-btn">
            Guardar
          </button>
          {onCancelar && (
            <button type="button" className="cancelar-btn" onClick={onCancelar}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    )
  }
  
  export default FormularioDireccion;