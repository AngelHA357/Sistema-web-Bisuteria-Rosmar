import React, { useState, useEffect } from 'react';
import { BarraNavegacion } from './BarraNavegacion';
import { FiltroCategorias } from './FiltroCategorias';
import './estilos/catalogoStyles.css';

export function CatalogoProductos() {
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
        </>
    );
}