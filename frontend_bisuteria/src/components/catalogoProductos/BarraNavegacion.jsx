import React from 'react';
import logoBisuteria from '/imgs/logo_bisuteria_acceso_usuario.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import './estilos/barraNavStyles.css';

export function BarraNavegacion({ cartItemsCount, onCartClick, onAccountClick }) {
    return (
      <header className="barraNav">
        <img src={logoBisuteria} alt="Logo Rosmar Bisutería" className="logo" />
        <div className="user-actions">
          <button onClick={onCartClick}>
          <FontAwesomeIcon icon={faShoppingCart} />
            Carrito {cartItemsCount > 0 && `(${cartItemsCount})`}
          </button>
          <button onClick={onAccountClick} ><FontAwesomeIcon icon={faCircleUser} /> Mi cuenta</button>
        </div>
      </header>
    );
  }