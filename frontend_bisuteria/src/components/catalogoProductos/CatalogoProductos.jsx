import React, { useState, useEffect } from 'react';
import { BarraNavegacion } from './BarraNavegacion';
import { FiltroCategorias } from './FiltroCategorias';
import productos from '../../mocks/productos.json'
import './estilos/catalogoStyles.css';
import { TarjetaProducto } from './TarjetaProducto';

export function CatalogoProductos() {
    const [productosState] = useState(productos)
    const [filtros, setFiltros] = useState({
        categoria_id: ''
    }) 


    const filtrarProductos = (productos) => {
        return productos.filter(producto => {
            return (
                filtros.categoria_id === '' ||
                producto.categoria_id === parseInt(filtros.categoria_id)
            )
        })
    }

    const productosFiltrados = filtrarProductos(productosState)

    const handleCategoriaChange = (categoria_id) => {
        setFiltros({ categoria_id });
      };

    const handleCartClick = () => {
        console.log('Carrito clicked');
    };

    const handleAccountClick = () => {
        console.log('Mi cuenta clicked');
    };

    return (
        <>
            <BarraNavegacion
                cartItemsCount={0}
                onCartClick={handleCartClick}
                onAccountClick={handleAccountClick}
            />
            <FiltroCategorias 
                activeCategoria={filtros.categoria_id}
                onCategoriaChange={handleCategoriaChange} 
            />
            <div className='product-list'>
            {productosFiltrados.map((producto) => (
                
                <TarjetaProducto 
                key={producto.id}
                image={producto.imagenes[0]}
                name={producto.nombre}
                price={producto.precio}
                category={producto.categoria_id}
                />        
            ))}
            </div>
        </>
    );
}
