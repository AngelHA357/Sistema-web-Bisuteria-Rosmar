import { useState, useEffect } from "react"
import useDipomex from "./hooks/useDipomex";
import "./estilos/formDireccion.css"

const FormularioDireccion = ({ onGuardar, onCancelar }) => {
    const [formData, setFormData] = useState({
        calle: "",
        numeroExterior: "",
        numeroInterior: "",
        codigoPostal: "",
        esatdo: "",
        ciudad: "",
        colonia: "",
        indicaciones: "",
    });

    const { datos, error, cargando } = useDipomex(formData.codigoPostal);

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    useEffect(() => {
        if (datos) {
            setFormData((prev) => ({
                ...prev,
                estado: datos.estado || "",
                ciudad: datos.municipio || "",
                colonia: datos.colonias?.[0]?.colonia || "",
            }));
        }
    }, [datos]);

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
                    maxLength="5"
                    required
                />
                {cargando && <span>Cargando...</span>}
                {error && <span className="error">{error}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="estado">Estado:</label>
                <input 
                    type="text" 
                    id="estado" 
                    name="estado" 
                    value={formData.estado} 
                    onChange={handleChange}
                    required 
                />
            </div>

            <div className="form-group">
                <label htmlFor="ciudad">Ciudad:</label>
                <input 
                    type="text" 
                    id="ciudad" 
                    name="ciudad" 
                    value={formData.ciudad} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            <div className="form-group">
                <label htmlFor="colonia">Colonia:</label>
                <select
                    id="colonia"
                    name="colonia"
                    value={formData.colonia}
                    onChange={handleChange}
                    required
                    disabled={!datos || !datos.colonias?.length}
                >
                    <option value="">Selecciona una colonia</option>
                    {datos?.colonias?.map((colonia, index) => (
                        <option key={index} value={colonia}>
                            {colonia}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="direccion">Calle:</label>
                <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-row">
                <div className="form-group numero-exterior">
                    <label htmlFor="numeroExterior">Número exterior:</label>
                    <input
                        type="text"
                        id="numeroExterior"
                        name="numeroExterior"
                        value={formData.numeroExterior}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group numero-interior">
                    <label htmlFor="numeroInterior">
                        Número interior: <span className="opcional">(opcional)</span>
                    </label>
                    <input
                        type="text"
                        id="numeroInterior"
                        name="numeroInterior"
                        value={formData.numeroInterior}
                        onChange={handleChange}
                    />
                </div>
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