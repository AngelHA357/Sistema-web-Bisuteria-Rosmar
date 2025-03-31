import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './estilos/filtroCategoriasStyles.css';

export function FiltroCategorias({ activeCategoria, onCategoriaChange }) {
  const { token } = useContext(UserContext);
  const [categorias, setCategorias] = useState([
    { id: '', nombre: 'Ver todo' }
  ]);

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
          setCategorias([{ id: '', nombre: 'Ver todo' }, ...data]);
        } else {
          console.error('Error al cargar las categorías:', data.message);
        }
      } catch (error) {
        console.error('Error al consultar categorías:', error);
      }
    };

    if (token) {
      fetchCategorias();
    } else {
      console.error('Debes iniciar sesión para cargar las categorías');
    }
  }, [token]);

  return (
    <div className="filtroCat">
      {categorias.map((categoria) => (
        <button
          key={categoria.id || 'ver-todo'}
          className={activeCategoria === categoria.nombre ? 'active' : ''} // Comparar con el nombre
          onClick={() => onCategoriaChange(categoria.nombre)} // Pasar el nombre
        >
          {categoria.nombre}
        </button>
      ))}
    </div>
  );
}