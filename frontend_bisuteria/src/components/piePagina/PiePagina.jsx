import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import './piePaginaStyles.css';

export function PiePagina() {
    return (
      <footer className="footer">
        <div className="acerca">
          <h2>Acerca de nosotros</h2>
          <p>Creamos piezas únicas que<br></br> reflejan tu estilo personal.</p>
        </div>
        <div className="redes">
          <h2>Síguenos</h2>
          <a href="https://www.instagram.com" target='_blank'><FontAwesomeIcon icon={faInstagram} /></a>
        </div>
        <div className="copy">
          <p>&copy; 2025 Bisutería Rosmar. Todos los derechos reservados</p>
        </div>
      </footer>
    );
  }