import { useState, useEffect } from "react"
import direccionCP from "./hooks/direccionCP";
import "./estilos/formDireccion.css"

const FormularioDireccion = ({ onGuardar, onCancelar }) => {
    const [formData, setFormData] = useState({
        calle: "",
        numeroExterior: "",
        numeroInterior: "",
        codigoPostal: "",
        estado: "",
        ciudad: "",
        colonia: "",
    });

    const [errors, setErrors] = useState({});

    const { datos, error, cargando } = direccionCP(formData.codigoPostal);

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        const { errors } = validarDireccion({
            ...formData,
            [name]: value
          });
          setErrors(prev => ({
            ...prev,
            [name]: errors[name] || ''
          }));
    };

    useEffect(() => {
        if (datos) {
            setFormData((prev) => ({
                ...prev,
                estado: datos.estado || "",
                ciudad: datos.municipio || "",
                colonia: datos.colonias?.[0] || "",
            }));
        }
    }, [datos]);

    const handleSubmit = (e) => {
        console.log("Datos enviados:", formData)
        e.preventDefault()
        const { isValido, errors } = validarDireccion(formData);
        if (!isValido) {
           setErrors(errors);
           return;
        }else {
            onGuardar(formData)
        }
    }

    const validarDireccion = (formData) => {
        const errors = {};
        let isValido = true;

        if (!formData.calle?.trim()) {
            errors.calle = "La calle es requerida";
            isValido = false;
        } else if (formData.calle.length < 3) {
            errors.calle = "La calle debe tener al menos 3 caracteres";
            isValido = false;
        } else if (!/^[a-zA-Z0-9\sñÑáéíóúÁÉÍÓÚ.-]+$/.test(formData.calle)) {
            errors.calle = "La calle contiene caracteres no permitidos";
            isValido = false;
        }

        if (!formData.numeroExterior?.trim()) {
            errors.numeroExterior = "El número exterior es requerido";
            isValido = false;
        } else if (!/^[0-9a-zA-Z-]+$/.test(formData.numeroExterior)) {
            errors.numeroExterior = "El número exterior solo puede contener números, letras y guiones";
            isValido = false;
        } else if (formData.numeroExterior.length > 10) {
            errors.numeroExterior = "El número exterior no puede exceder 10 caracteres";
            isValido = false;
        }

        const numInt = formData.numeroInterior?.trim();
        if (numInt) {
            if (!/^[0-9a-zA-Z-]+$/.test(numInt)) {
                errors.numeroInterior = "El número interior solo puede contener números, letras y guiones";
                isValido = false;
            } else if (numInt.length > 10) {
                errors.numeroInterior = "El número interior no puede exceder 10 caracteres";
                isValido = false;
            }
        }

        return { isValido, errors };
    };

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
                    disabled={cargando || !!datos}
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
                    disabled={cargando || !!datos}
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
                    disabled={!datos || !datos || !datos.colonias?.length}
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
                <label htmlFor="calle">Calle:</label>
                <input
                    type="text"
                    id="calle"
                    name="calle"
                    value={formData.calle}
                    onChange={handleChange}
                    required
                />
                {errors.calle && <span className="error">{errors.calle}</span>}
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
                    {errors.numeroExterior && <span className="error">{errors.numeroExterior}</span>}
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
                    {errors.numeroInterior && <span className="error">{errors.numeroInterior}</span>}
                </div>
            </div>

            <div className="form-actions" onSubmit={handleSubmit}>
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