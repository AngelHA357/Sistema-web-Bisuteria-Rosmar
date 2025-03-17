import React, { useState, useEffect } from 'react';
import { BarraNavegacion } from './BarraNavegacion';
import { FiltroCategorias } from './FiltroCategorias';
import productos from '../../mocks/productos.json'
import './estilos/catalogoStyles.css';
import { TarjetaProducto } from './TarjetaProducto';

export function CatalogoProductos() {
    const [productosState] = useState(productos)
    const [filtros, setFiltros] = useState({
        categoria: 'todas'
    }) 


    const filtrarProductos = (productos) => {
        return productos.filter(producto => {
            return (
                filtros.categoria === 'todas' ||
                producto.categoria === filtros.categoria
            )
        })
    }

    const productosFiltrados = filtrarProductos(productosState)

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
            />
            <div className='product-list'>
            {productosFiltrados.map((producto) => (
                
                <TarjetaProducto 
                key={producto.id}
                image={producto.imagenes[0]}
                name={producto.nombre}
                price={producto.precio}
                category={producto.categoria}
                />        
            ))}
            </div>
        </>
    );
}
