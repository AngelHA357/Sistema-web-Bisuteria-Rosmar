import React, { useContext } from 'react';
import logoBisuteria from '/imgs/logo_bisuteria_acceso_usuario.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import './estilos/barraNavStyles.css';
import { UserContext } from '../../context/UserContext';

export function BarraNavegacion() {
const { logout } = useContext(UserContext);
  return (
    <header className="barraNav">
      <img src={logoBisuteria} alt="Logo Rosmar Bisutería" className="logo" />
      <div className="user-actions">
        <button>
          <FontAwesomeIcon icon={faShoppingCart} />
          Carrito
        </button>
        <button onClick={logout} ><FontAwesomeIcon icon={faCircleUser} /> Mi cuenta</button>
      </div>
    </header>
  );
}