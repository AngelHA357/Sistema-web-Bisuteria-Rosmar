import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarraNavegacion } from './BarraNavegacion';
import { FiltroCategorias } from './FiltroCategorias';
import './estilos/catalogoStyles.css';
import { TarjetaProducto } from './TarjetaProducto';
import { UserContext } from '../../context/UserContext';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function CatalogoProductos() {
  const navigate = useNavigate();
  const { usuario, token } = useContext(UserContext);
  const [productosState, setProductosState] = useState([]);
  const [reloadCategorias, setReloadCategorias] = useState(0);
  const [filtros, setFiltros] = useState({
    categoria: 'Ver todo'
  });
  const [showInput, setShowInput] = useState(false); 
  const [nuevaCategoria, setNuevaCategoria] = useState(''); 

  useEffect(() => {
    if (token) {
      fetchProductos(filtros.categoria);
    } else {
      navigate('/');
    }
  }, [token, filtros.categoria, navigate]);

  const fetchProductos = async (categoriaNombre = 'Ver todo') => {
    try {
      let url = 'http://localhost:3000/api/producto';
      if (categoriaNombre && categoriaNombre !== 'Ver todo') {
        url = `http://localhost:3000/api/producto?categoria=${encodeURIComponent(categoriaNombre)}`;
      }

      console.log('URL de la solicitud:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log('Respuesta del backend:', data);

      if (response.ok) {
        setProductosState(data);
      } else {
        console.error('Error al cargar los productos:', data.message);
        setProductosState([]);
      }
    } catch (error) {
      console.error('Error al consultar productos:', error);
      setProductosState([]);
    }
  };

  const handleCategoriaChange = (categoriaNombre) => {
    setFiltros({ categoria: categoriaNombre });
  };

  const handleAddProductClick = () => {
    navigate('/nuevoProducto');
  };

  const handleRealizarPedido = () => {
    navigate('/realizarPedido');
  };

  const handleAddCategoryClick = () => {
    setShowInput(!showInput);
  };

  const addCategory = async (nuevaCategoria) => {
    if (!nuevaCategoria.trim()) {
      alert('Por favor, ingresa un nombre para la categoría');
      return;
    }

    const nombreRegex = /^[a-zA-Z0-9\s]{5,}$/;
    if (!nombreRegex.test(nuevaCategoria)) {
      alert('El nombre de la categoría debe tener más de 4 caracteres y solo puede contener letras, números y espacios');
      return;
    }

    try {
      const body = {
        nombre: nuevaCategoria
      };
      const response = await fetch('http://localhost:3000/api/categoria', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok) {
        setFiltros({ categoria: 'Ver todo' });
        setShowInput(false); 
        setNuevaCategoria('');
        setReloadCategorias((prev) => prev + 1);
        alert('Categoría agregada con éxito');
      } else {
        alert('Error al agregar la categoría: ' + data.message);
      }
    } catch (error) {
      alert('Error al agregar la categoría: ' + error.message);
    }
  };

  return (
    <>
      <div className="catalogo-page">
        <BarraNavegacion />
        <div className="filter-container">
          <FiltroCategorias
            activeCategoria={filtros.categoria}
            onCategoriaChange={handleCategoriaChange}
            reloadCategorias={reloadCategorias}
          />
          {usuario && usuario.tipo === 'Administrador' && (
            <div className="category-add-container">
              <button id="btn-add-category" onClick={handleAddCategoryClick}>
                <FontAwesomeIcon icon={faCirclePlus} className='icon-add-category'/>
              </button>
              {showInput && (
                <div className="input-container">
                  <input
                    type="text"
                    value={nuevaCategoria}
                    onChange={(e) => setNuevaCategoria(e.target.value)}
                    placeholder="Nombre de la categoría"
                  />
                  <button onClick={() => addCategory(nuevaCategoria)}>Confirmar</button>
                </div>
              )}
            </div>
          )}
        </div>
        {usuario && usuario.tipo === 'Administrador' && (
          <button id="btn-add-product" onClick={handleAddProductClick}>
            Nuevo producto
          </button>
        )}
        {usuario && (
          <button id="btn-add-product" onClick={handleRealizarPedido}>
            Realizar pedido
          </button>
        )}
        <div className="product-list">
          {productosState.length > 0 ? (
            productosState.map((producto) => (
              <TarjetaProducto
                key={producto.id}
                image={producto.imagenes && producto.imagenes.length > 0 ? producto.imagenes[0] : 'default-image.jpg'}
                name={producto.nombre}
                price={producto.precio}
                category={producto.categoria.nombre}
              />
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      </div>
    </>
  );
}