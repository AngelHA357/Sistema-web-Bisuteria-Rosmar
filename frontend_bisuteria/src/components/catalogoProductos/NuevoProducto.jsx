import React, { useContext, useEffect, useState } from 'react';
import { BarraNavegacion } from './BarraNavegacion';
import { UserContext } from '../../context/UserContext';
import './estilos/nuevoProductoStyles.css';
import { BotonConfirmar } from '../accesoUsuario/botonConfirmar';
import { useNavigate } from 'react-router-dom';

export function NuevoProducto() {
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagenes: [],
    categoria: '', 
    colores: '["#FF0000","#00FF00"]' 
  });
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/categoria', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setCategorias(data);
        } else {
          setMensaje(data.message || 'Error al cargar las categorías');
        }
      } catch (error) {
        console.error('Error al consultar categorías:', error);
        setMensaje('Error de conexión con el servidor al cargar categorías');
      }
    };

    if (token) {
      fetchCategorias();
    } else {
      setMensaje('Debes iniciar sesión para cargar las categorías');
    }
  }, [token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Gestionar la subida de imágenes
  const handleImagenesChange = (e) => {
    const archivos = Array.from(e.target.files);
    setFormData({
      ...formData,
      imagenes: archivos
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos
    if (!formData.nombre || !formData.categoria || !formData.precio) {
      setMensaje('Por favor, completa todos los campos obligatorios');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('nombre', formData.nombre);
    formDataToSend.append('descripcion', formData.descripcion);
    formDataToSend.append('precio', parseFloat(formData.precio));
    formDataToSend.append('categoria', parseInt(formData.categoria)); 
    formDataToSend.append('colores', formData.colores);
    formData.imagenes.forEach((file) => {
      formDataToSend.append('files', file); 
    });

    
    console.log('Datos enviados al backend:');
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch('http://localhost:3000/api/producto', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await response.json();
      console.log('Respuesta del backend:', data);
      console.log('Código de estado:', response.status);

      if (response.ok) {
        setMensaje('Producto registrado con éxito');
        setFormData({ nombre: '', descripcion: '', precio: '', imagenes: [], categoria: '', colores: '["#FF0000","#00FF00"]' });
        document.querySelector('input[name="imagenes"]').value = '';
        navigate('/catalogo')
      } else {
        setMensaje(data.message || 'Error al registrar el producto');
      }
    } catch (error) {
      console.error('Error al registrar producto:', error);
      setMensaje('Error de conexión con el servidor');
    }
  };

  return (
    <>
    <BarraNavegacion />
    <div className="nuevo-producto-container">
      <h2>Nuevo producto</h2>
      <form className="nuevo-producto-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre del producto"
          />
        </div>
        <div className="form-group">
          <label>Categoría:</label>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="">Seleccione una categoría...</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción del producto"
          />
        </div>
        <div className="form-group">
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>Colores:</label>
          <input
            type="color"
            name="colores"
            value={formData.colores}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Imágenes:</label>
          <input
            type="file"
            name="imagenes"
            multiple
            onChange={handleImagenesChange}
            accept="image/*"
          />
          {formData.imagenes.length > 0 && (
            <ul className="imagenes-lista">
              {formData.imagenes.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>
        <BotonConfirmar textoBoton="Confirmar" />
      </form>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
    </>
  );
}