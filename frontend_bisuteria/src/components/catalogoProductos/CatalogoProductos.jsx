import React, { useState, useEffect } from 'react';
import { FiltroCategorias } from './FiltroCategorias';
// import productos from '../../mocks/productos.json'
import './estilos/catalogoStyles.css';
import { TarjetaProducto } from './TarjetaProducto';

export function CatalogoProductos() {
    const apiUrl = import.meta.env.VITE_BACK_URL;

    const [productosState, setProductosState] = useState([]);
    const [filtros, setFiltros] = useState({
        categoria_id: ''
    });

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(`${apiUrl}/producto`);
                if (!response.ok) {
                    throw new Error('Error al obtener productos');
                }
                const data = await response.json();
                setProductosState(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProductos();
    }, [apiUrl]);

    const filtrarProductos = (productos) => {
        return productos.filter(producto => {
            return (
                filtros.categoria_id === '' ||
                producto.categoria.id === parseInt(filtros.categoria_id)
            );
        });
    };

    const productosFiltrados = filtrarProductos(productosState);

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
            <FiltroCategorias 
                activeCategoria={filtros.categoria_id}
                onCategoriaChange={handleCategoriaChange} 
            />
            <div className='product-list'>
                {productosFiltrados.map((producto) => (
                    <TarjetaProducto 
                    productId={producto.id}
                    image={producto.imagenes[0]}
                    name={producto.nombre}
                    price={producto.precio}
                    category={producto.categoria.nombre}
                    />        
                ))}
            </div>
        </>
    );
}
