import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './estilos/filtroCategoriasStyles.css';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function FiltroCategorias({ activeCategoria, onCategoriaChange, reloadCategorias }) {
  const { usuario, token } = useContext(UserContext);
  const [categorias, setCategorias] = useState([
    { id: '', nombre: 'Ver todo' }
  ]);
  const [editingCategoriaId, setEditingCategoriaId] = useState(null); 
  const [categoriaActualizada, setCategoriaActualizada] = useState(''); 

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
  }, [token, reloadCategorias]);

  const handleDeleteCategoria = async (categoriaId) => {
    if (!categoriaId) return;

    const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta categoría?');

    if (!confirmacion) {
      return;
    } else {
      try {
        const response = await fetch(`http://localhost:3000/api/categoria/${categoriaId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          setCategorias(categorias.filter((cat) => cat.id !== categoriaId));
          if (activeCategoria === categorias.find((cat) => cat.id === categoriaId).nombre) {
            onCategoriaChange('Ver todo');
          }
        } else {
          const data = await response.json();
          console.error('Error al eliminar la categoría:', data.message);
          alert('Error: Ya existen productos en la categoría');
        }
      } catch (error) {
        console.error('Error al eliminar la categoría:', error);
      }
    }
  };

  const handleEditCategoryClick = (categoriaId) => {
    if (editingCategoriaId === categoriaId) {
      setEditingCategoriaId(null);
      setCategoriaActualizada('');
    } else {
      setEditingCategoriaId(categoriaId);
      const categoria = categorias.find((cat) => cat.id === categoriaId);
      setCategoriaActualizada(categoria ? categoria.nombre : '');
    }
  };

  const editCategoria = async (categoriaId) => {
    if (!categoriaId || !categoriaActualizada.trim()) {
      alert('Por favor, ingresa un nombre válido para la categoría');
      return;
    }

    const nombreRegex = /^[a-zA-Z0-9\s]{4,}$/;
    if (!nombreRegex.test(categoriaActualizada)) {
      alert('El nombre de la categoría debe tener más de 4 caracteres y solo puede contener letras, números y espacios');
      return;
    }

    try {
      const body = {
        id: categoriaId,
        nombre: categoriaActualizada
      };
      const response = await fetch(`http://localhost:3000/api/categoria`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok) {
        setCategorias(categorias.map((cat) =>
          cat.id === categoriaId ? { ...cat, nombre: categoriaActualizada } : cat
        ));
        setEditingCategoriaId(null);
        setCategoriaActualizada('');
        alert('Categoría actualizada con éxito');
      } else {
        console.error('Error al editar la categoría:', data.message);
        alert('Error al editar la categoría: ' + data.message);
      }
    } catch (error) {
      console.error('Error al editar la categoría:', error);
      alert('Error al editar la categoría: ' + error.message);
    }
  };

  return (
    <div className="filtroCat">
      {categorias.map((categoria) => (
        <div key={categoria.id || 'ver-todo'} className="categoria-wrapper">
          <button
            className={activeCategoria === categoria.nombre ? 'active' : ''}
            onClick={() => onCategoriaChange(categoria.nombre)}
          >
            <span className="categoria-nombre">{categoria.nombre}</span>
            {usuario && usuario.tipo === 'Administrador' && categoria.id && (
              <div className="category-options-container">
                <span
                  className="option-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCategoria(categoria.id);
                  }}
                >
                  ✕
                </span>
                <span
                  className="option-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditCategoryClick(categoria.id);
                  }}
                >
                  <FontAwesomeIcon icon={faPencil} />
                </span>
              </div>
            )}
          </button>
          {editingCategoriaId === categoria.id && (
            <div className="edit-input-container">
              <input
                type="text"
                value={categoriaActualizada}
                onChange={(e) => setCategoriaActualizada(e.target.value)}
                placeholder="Nombre nuevo de la categoría"
              />
              <button onClick={() => editCategoria(categoria.id)}>Confirmar</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}