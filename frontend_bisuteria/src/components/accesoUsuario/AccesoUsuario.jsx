import logoBisuteria from '/imgs/logo_bisuteria_acceso_usuario.png';
import { CampoDato } from './CampoDato';
import { BarraOpciones } from './BarraOpciones';
import { BotonConfirmar } from './botonConfirmar';
import { CatalogoProductos } from '../catalogoProductos/CatalogoProductos';
import './accesoUsuarioStyles.css';
import { UserContext } from '../../context/UserContext';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export function AccesoUsuario() {
  const navigate = useNavigate();
  const { usuario, setUsuario, setToken } = useContext(UserContext);
  const [modoAcceso, setModoAcceso] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    lastName1: '',
    lastName2: '',
    confirmPassword: ''
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const camposAMostrar = () => {
    if (modoAcceso === 'login') {
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
            nombre="Apellido paterno"
            value={formData.lastName1}
            onChange={handleChange}
            name="lastName1"
          />
          <CampoDato
            tipo="text"
            nombre="Apellido materno"
            value={formData.lastName2}
            onChange={handleChange}
            name="lastName2"
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

  const agregarUsuario = async () => {
    if (modoAcceso !== 'register') return;

    if (formData.password !== formData.confirmPassword) {
      setMensaje('Las contraseñas no coinciden');
      return;
    }

    const nuevoUsuario = {
      correo: formData.email,
      contrasena: formData.password,
      nombre: formData.name,
      apellidoPaterno: formData.lastName1,
      apellidoMaterno: formData.lastName2,
      tipo: "normal"
    };

    try {
      const response = await fetch('http://localhost:3000/api/cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoUsuario)
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje('Usuario registrado con éxito');
        setFormData({ email: '', password: '', name: '', lastName: '', confirmPassword: '' });
      } else {
        setMensaje(data.message || 'Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setMensaje('Error de conexión con el servidor');
    }
  };

  const verificarLogin = async () => {
    if (modoAcceso !== 'login') return;

    const credenciales = {
      correo: formData.email,
      contrasena: formData.password
    };

    try {
      const response = await fetch('http://localhost:3000/api/cliente/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credenciales)
      });

      const data = await response.json();
      console.log('Respuesta del backend en login:', data);

      if (response.ok) {
        const token = data.token;
        if (!token) {
          setMensaje('Error: No se recibió el token');
          return;
        }

        // Decodificar el token para obtener los datos del usuario
        const usuario = jwtDecode(token);
        console.log('Usuario decodificado del token:', usuario);

        setToken(token);
        setUsuario(usuario);
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
        setMensaje('Inicio de sesión exitoso');
        navigate('/catalogo');

      } else {  
        setMensaje(data.message || 'Correo o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMensaje('Error de conexión con el servidor');
    }
  };

  const handleSubmit = () => {
    modoAcceso === 'login' ? verificarLogin() : agregarUsuario();
  };

  if (usuario) {
    navigate('/catalogo');
    return null;
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
          onClick={handleSubmit}
        />
        <p>{mensaje}</p>
      </div>
    </div>
  );

}