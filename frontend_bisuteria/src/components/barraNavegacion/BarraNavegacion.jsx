import React from 'react';
import logoBisuteria from '/imgs/logo_bisuteria_acceso_usuario.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import './barraNavStyles.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react';

export function BarraNavegacion() {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate(`/catalogo`);
    };

    const [cartItemsCount, setCartItemsCount] = useState(0);

    const getCartItemsCount = () => {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      return carrito.length;
    };

    useEffect(() => {
      setCartItemsCount(getCartItemsCount());
    }, []);
    
    window.addEventListener('storage', () => {
      setCartItemsCount(getCartItemsCount());
    })

    const onCartClick = () => {
      navigate(`/carrito`);
    };

    const onAccountClick = () => {
      navigate(`/`);
    };

    return (
      <header className="barraNav">
        <img src={logoBisuteria} alt="Logo Rosmar Bisutería" className="logo" onClick={handleClick}/>
        <div className="user-actions">
          <button onClick={onCartClick}>
          <p></p>
          <FontAwesomeIcon icon={faShoppingCart} />
            Carrito {cartItemsCount > 0 && `(${cartItemsCount})`}
          </button>
          <button onClick={onAccountClick} ><FontAwesomeIcon icon={faCircleUser} /> Mi cuenta</button>
        </div>
      </header>
    );
  }