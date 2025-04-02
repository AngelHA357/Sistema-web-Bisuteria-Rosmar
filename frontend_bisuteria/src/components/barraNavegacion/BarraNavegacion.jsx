import React from 'react';
import logoBisuteria from '/imgs/logo_bisuteria_acceso_usuario.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import './barraNavStyles.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react';

export function BarraNavegacion() {
    const id = 6; // CAMBIAR ESTO POR EL ID DEL USUARIO LOGUEADO
    const navigate = useNavigate();
    const handleClick = () => {
      navigate(`/catalogo`);
    };

    const [cartItemsCount, setCartItemsCount] = useState(0);

    const getCartItemsCount = async () => {
      try {
          const response = await fetch(`${import.meta.env.VITE_BACK_URL}/cliente/${id}/carrito`);
          if (!response.ok) {
              throw new Error('Error al obtener el carrito');
          }
          const carrito = await response.json();
          return carrito.listado.length;
      } catch (error) {
          console.error(error);
          return 0;
      }
    };

    useEffect(() => {
      const fetchCartCount = async () => {
          const count = await getCartItemsCount();
          setCartItemsCount(count);
      };
      fetchCartCount();
    }, []);
    
    window.addEventListener('storage', async () => {
      const count = await getCartItemsCount();
      setCartItemsCount(count);
    });

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