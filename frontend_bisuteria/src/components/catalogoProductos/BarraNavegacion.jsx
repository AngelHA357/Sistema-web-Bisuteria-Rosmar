import React, { useContext, useState } from 'react';
import logoBisuteria from '/imgs/logo_bisuteria_acceso_usuario.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import './estilos/barraNavStyles.css';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export function BarraNavegacion() {
  const navigate = useNavigate();
  const { logout, usuario } = useContext(UserContext);
  const [showLogout, setShowLogout] = useState(false);

  const handleUserButtonClick = () => {
    setShowLogout(!showLogout);
  };

  return (
    <header className="barraNav">
      <img src={logoBisuteria} alt="Logo Rosmar Bisutería" className="logo"/>
      <div className="user-actions">
        <button>
          <FontAwesomeIcon icon={faShoppingCart} />
          Carrito
        </button>
        <div className="user-button-container">
          <button onClick={handleUserButtonClick}>
            <FontAwesomeIcon icon={faCircleUser} /> {usuario?.nombre || 'Mi cuenta'}
          </button>
          {showLogout && (
            <button className="logout-btn" onClick={logout}>
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
}