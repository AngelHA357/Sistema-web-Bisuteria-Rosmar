import React from 'react';
import './estilos/filtroCategoriasStyles.css';

export function FiltroCategorias() {
  const filters = ['ver todo', 'Pulseras', 'Collares', 'Aretes', 'Otros'];

  return (
    <div className="filtroCat">
      {filters.map((filter) => (
        <button>
            {filter}
        </button>
      ))}
    </div>
  );
}