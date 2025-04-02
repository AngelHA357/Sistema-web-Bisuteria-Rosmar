import React, { useContext, useState, useEffect } from 'react';
import logoBisuteria from '/imgs/logo_bisuteria_acceso_usuario.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import './estilos/barraNavStyles.css';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export function BarraNavegacion() {
  const navigate = useNavigate();
  const { logout, usuario, token } = useContext(UserContext); // Mantener UserContext
  const [showLogout, setShowLogout] = useState(false); // Mantener el estado para el dropdown
  const [cartItemsCount, setCartItemsCount] = useState(0); // Agregar estado para el conteo del carrito

  // Función para obtener el conteo de ítems del carrito (del segundo código)
  const getCartItemsCount = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/cliente/${usuario.id}/carrito`, {
        headers: {
          'Authorization': `Bearer ${token}` // Agregar token para autenticación
        }
      });
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

  // useEffect para obtener el conteo inicial del carrito (del segundo código)
  useEffect(() => {
    const fetchCartCount = async () => {
      if (usuario?.id) { // Asegurarse de que usuario.id esté definido
        const count = await getCartItemsCount();
        setCartItemsCount(count);
      }
    };
    fetchCartCount();
  }, [usuario?.id, token]); // Dependencias: usuario.id y token

  // Evento para actualizar el conteo del carrito cuando cambia el almacenamiento (del segundo código)
  useEffect(() => {
    const handleStorageChange = async () => {
      if (usuario?.id) {
        const count = await getCartItemsCount();
        setCartItemsCount(count);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Limpiar el event listener al desmontar el componente
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [usuario?.id, token]); // Dependencias: usuario.id y token

  // Mantener la funcionalidad del dropdown (del primer código)
  const handleUserButtonClick = () => {
    setShowLogout(!showLogout);
  };

  // Agregar evento onClick para el logo (del segundo código)
  const handleClick = () => {
    navigate(`/catalogo`);
  };

  // Agregar evento onClick para el botón de carrito (del segundo código)
  const onCartClick = () => {
    navigate(`/carrito`);
  };

  return (
    <header className="barraNav">
      <img src={logoBisuteria} alt="Logo Rosmar Bisutería" className="logo" onClick={handleClick} />
      <div className="user-actions">
        <button onClick={onCartClick}>
          <FontAwesomeIcon icon={faShoppingCart} />
          Carrito {cartItemsCount > 0 && `(${cartItemsCount})`} {/* Agregar conteo del carrito */}
        </button>
        <div className="user-button-container">
          <button onClick={handleUserButtonClick}>
            <FontAwesomeIcon icon={faCircleUser} /> {usuario?.nombre || 'Mi cuenta'} {/* Mantener nombre del usuario */}
          </button>
          {showLogout && (
            <button className="logout-btn" onClick={logout}>
              Cerrar sesión {/* Mantener el botón de logout */}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}