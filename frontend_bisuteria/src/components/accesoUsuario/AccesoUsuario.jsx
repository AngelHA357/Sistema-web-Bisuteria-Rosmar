import logoBisuteria from '/imgs/logo_bisuteria_acceso_usuario.png';
import { CampoDato } from './CampoDato';
import { BarraOpciones } from './BarraOpciones';
import { BotonConfirmar } from './botonConfirmar';
import './accesoUsuarioStyles.css';
import React, { useState } from 'react';

export function AccesoUsuario() {
    const [modoAcceso, setModoAcceso] = useState('login');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        lastName: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const camposAMostrar = () => {
        if (modoAcceso === 'login'){
            return (
                <>
                  <CampoDato
                    tipo="email"
                    nombre="Correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                  />
                  <CampoDato
                    tipo="password"
                    nombre="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                  />
                </>
              );
        } else {
            return (
                <>
                  <CampoDato
                    tipo="text"
                    nombre="Nombre"
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
                  />
                  <CampoDato
                    tipo="text"
                    nombre="Apellido"
                    value={formData.lastName}
                    onChange={handleChange}
                    name="lastName"
                  />
                  <CampoDato
                    tipo="email"
                    nombre="Correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                  />
                  <CampoDato
                    tipo="password"
                    nombre="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                  />
                  <CampoDato
                    tipo="password"
                    nombre="Confirmar Contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    name="confirmPassword"
                  />
                </>
              );
        }

        
    }

    return (
        <div className="acceso-usuario">
          <img src={logoBisuteria} alt="Logo Bisutería Rosmar" />
          <div className="formulario">
            <BarraOpciones
              modo={modoAcceso}
              setModo={setModoAcceso}
            />
            {camposAMostrar()}
            <BotonConfirmar
              textoBoton={modoAcceso === 'login' ? 'Iniciar sesión' : 'Registrarse'}
            />
          </div>
        </div>
      );
    
}