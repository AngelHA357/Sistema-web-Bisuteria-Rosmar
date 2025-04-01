import React, { useContext, useEffect, useState } from 'react';
import { BarraNavegacion } from './BarraNavegacion';
import { UserContext } from '../../context/UserContext';
import './estilos/nuevoProductoStyles.css';
import { BotonConfirmar } from '../accesoUsuario/BotonConfirmar';
import { useNavigate } from 'react-router-dom';

export function NuevoProducto() {
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagenes: [],
    categoria: ''
  });
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (token) {
      fetchCategorias();
    } else {
      navigate('/');
    }
  }, [token]);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImagenesChange = (e) => {
    const archivos = Array.from(e.target.files);
    setFormData({
      ...formData,
      imagenes: archivos
    });
  };

  const validarImagenes = (imagenes) => {
    if (imagenes.length === 0) {
      setMensaje('Debe subir al menos una imagen');
      return false;
    }
    const extensionesPermitidas = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
    for (const file of imagenes) {
      if (!extensionesPermitidas.includes(file.type)) {
        setMensaje('Todas las imágenes deben ser PNG, JPG, JPEG o WEBP');
        return false;
      }
    }
    return true;
  };

  const validarPrecio = (precio) => {
    const precioNum = parseFloat(precio);
    if (isNaN(precioNum) || precioNum <= 10) {
      setMensaje('El precio debe ser un número mayor a 10');
      return false;
    }
    return true;
  };

  const validarNombre = (nombre) => {
    const nombreRegex = /^[a-zA-Z0-9\s]{5,}$/;
    if (!nombreRegex.test(nombre)) {
      setMensaje('El nombre del producto debe tener más de 4 caracteres y solo puede contener letras, números y espacios');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.categoria || !formData.precio || !formData.imagenes.length) {
      setMensaje('Por favor, completa todos los campos obligatorios');
      return;
    }

    if (!validarNombre(formData.nombre)) return;
    if (!validarPrecio(formData.precio)) return;
    if (!validarImagenes(formData.imagenes)) return;

    if (!formData.descripcion.trim()) {
      setMensaje('La descripción no puede estar vacía');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('nombre', formData.nombre);
    formDataToSend.append('descripcion', formData.descripcion);
    formDataToSend.append('precio', parseFloat(formData.precio));
    formDataToSend.append('categoria', parseInt(formData.categoria));
    formData.imagenes.forEach((file) => {
      formDataToSend.append('files', file);
    });

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

      if (response.ok) {
        setMensaje('Producto registrado con éxito');
        setFormData({ nombre: '', descripcion: '', precio: '', imagenes: [], categoria: '' });
        document.querySelector('input[name="imagenes"]').value = '';
        navigate('/catalogo');
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
            <label>Precio ($):</label>
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
            <label>Imágenes:</label>
            <input
              type="file"
              name="imagenes"
              multiple
              onChange={handleImagenesChange}
              accept="image/png, image/jpg, image/jpeg, image/webp"
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