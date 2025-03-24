import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarraNavegacion } from './BarraNavegacion';
import { FiltroCategorias } from './FiltroCategorias';
import './estilos/catalogoStyles.css';
import { TarjetaProducto } from './TarjetaProducto';
import { UserContext } from '../../context/UserContext';

export function CatalogoProductos() {
  const navigate = useNavigate();
  const { usuario, logout, token } = useContext(UserContext);
  const [productosState, setProductosState] = useState([]);
  const [filtros, setFiltros] = useState({
    categoria: 'Ver todo' 
  });

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

      console.log('URL de la solicitud:', url); // Depuración

      const response = await fetch(url, {
        headers: {  
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log('Respuesta del backend:', data); // Depuración

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

  return (
    <>
      <BarraNavegacion />
      <FiltroCategorias
        activeCategoria={filtros.categoria} 
        onCategoriaChange={handleCategoriaChange}
      />
      {usuario && usuario.tipo === 'Administrador' && (
        <button id="btn-add-product" onClick={handleAddProductClick}>
          Nuevo producto
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
    </>
  );
}