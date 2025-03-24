import React, { useState, useEffect } from 'react';
import './estilos/formDireccion.css';

const estadoInicial = {
    calle: '',
    ciudad: '',
    colonia: '',
    codigoPostal: '',
    numeroExterior: '',
    numeroInterior: '',
};

const FormDireccion = ({ onSubmit }) => {
    const [direcciones, setDirecciones] = useState([]);
    const [seleccionarDireccion, setSeleccionarDireccion] = useState('');
    const [formData, setFormData] = useState(estadoInicial);
    const [errores, setErrores] = useState({});
    const [guardarMensaje, setGuardarMensaje] = useState(null);

    useEffect(() => {
        fetch('/api/direcciones')
            .then((res) => res.json())
            .then(setDirecciones)
            .catch(() => setGuardarMensaje({ type: 'error', message: 'Error al cargar las direcciones' }));
    }, []);

    useEffect(() => {
        if (seleccionarDireccion) {
            const direccion = direcciones.find((d) => d.id === Number(seleccionarDireccion));
            setFormData(direccion || estadoInicial);
        } else {
            setFormData(estadoInicial);
        }
    }, [seleccionarDireccion, direcciones]);

    const validarCampo = (nombre, valor) => {
        if (nombre === 'numeroInterior') return '';
        if (!valor) return 'Este campo es obligatorio';
        return /^[a-zA-Z0-9\s,.-]*$/.test(valor) ? '' : 'No se permiten caracteres especiales';
    };

    const validarForm = () => {
        const nuevosErrores = Object.keys(formData).reduce((acc, key) => {
            const error = validarCampo(key, formData[key]);
            if (error) acc[key] = error;
            return acc;
        }, {});
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleGuardado = async () => {
        if (!validarForm()) return;

        try {
            const response = await fetch('/api/addresses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Error al guardar la dirección');
            const guardarDireccion = await response.json();
            setDirecciones([...direcciones, guardarDireccion]);
            setSeleccionarDireccion(guardarDireccion.id.toString());
            setGuardarMensaje({ type: 'success', text: 'Dirección guardada con éxito.' });
        } catch (err) {
            setGuardarMensaje({ type: 'error', text: err.message });
        }
    };

    return (
        <div className="form-group">
            <h3>Domicilio</h3>
            <select
                value={seleccionarDireccion}
                onChange={(e) => setSeleccionarDireccion(e.target.value)}
            >
                <option value="">Nueva dirección</option>
                {direcciones.map((dir) => (
                    <option key={dir.id} value={dir.id}>
                        {`Dirección guardada ${dir.id}`}
                    </option>
                ))}
            </select>

            <label>Calle:</label>
            <input
                type="text"
                name="calle"
                value={formData.calle}
                onChange={handleChange}
            />
            {errores.calle && <span className="error">{errores.calle}</span>}

            <label>Número Exterior:</label>
            <input
                type="text"
                name="numeroExterior"
                value={formData.numeroExterior}
                onChange={handleChange}
            />
            {errores.numeroExterior && <span className="error">{errores.numeroExterior}</span>}

            <label>Número Interior (opcional):</label>
            <input
                type="text"
                name="numeroInterior"
                value={formData.numeroInterior}
                onChange={handleChange}
            />
            {errores.numeroInterior && <span className="error">{errores.numeroInterior}</span>}

            <label>Colonia:</label>
            <input
                type="text"
                name="colonia"
                value={formData.colonia}
                onChange={handleChange}
            />
            {errores.colonia && <span className="error">{errores.colonia}</span>}

            <label>Ciudad:</label>
            <input
                type="text"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
            />
            {errores.ciudad && <span className="error">{errores.ciudad}</span>}

            <label>Código Postal:</label>
            <input
                type="text"
                name="codigoPostal"
                value={formData.codigoPostal}
                onChange={handleChange}
            />
            {errores.codigoPostal && <span className="error">{errores.codigoPostal}</span>}

            {guardarMensaje && (
                <p className={guardarMensaje.type === 'success' ? 'success' : 'error'}>
                    {guardarMensaje.text}
                </p>
            )}

            <p className="note">
                NOTA: Mandar comprobante de transferencia después de completar la compra al siguiente correo: bisuteria.rosmar@gmail.com
            </p>
            <div className="button-group">
                <button className="action-button secondary" onClick={handleGuardado}>
                    Guardar
                </button>
                <button className="action-button primary" onClick={handleSubmit}>
                    Confirmar
                </button>
            </div>
        </div>
    );
};


export default FormDireccion;