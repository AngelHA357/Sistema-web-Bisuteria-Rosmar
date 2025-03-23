import React from 'react';
import './estilos/filtroCategoriasStyles.css';

export function FiltroCategorias({activeCategoria, onCategoriaChange}) {
  const categorias = [
    { id: '', nombre: 'ver todo' },
    { id: 1, nombre: 'Collares' },
    { id: 2, nombre: 'Aretes' },
    { id: 3, nombre: 'Pulseras' },
    { id: 4, nombre: 'Otros' },
  ];

  return (
    <div className="filtroCat">
      {categorias.map((categoria) => (
        <button
        key={categoria.id}
        className={activeCategoria === categoria.id ? 'active' : ''}
        onClick={() => onCategoriaChange(categoria.id)}
        >
            {categoria.nombre}
        </button>
      ))}
    </div>
  );
}