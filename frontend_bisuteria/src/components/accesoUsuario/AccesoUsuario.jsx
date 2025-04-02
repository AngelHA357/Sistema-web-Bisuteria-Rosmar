import logoBisuteria from '/imgs/logo_bisuteria_acceso_usuario.png';
import { CampoDato } from './CampoDato';
import { BarraOpciones } from './BarraOpciones';
import { BotonConfirmar } from './BotonConfirmar';
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

  // Resetear formulario y mensaje al cambiar de modo
  const cambiarModo = (nuevoModo) => {
    setModoAcceso(nuevoModo);
    setFormData({
      email: '',
      password: '',
      name: '',
      lastName1: '',
      lastName2: '',
      confirmPassword: ''
    });
    setMensaje('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
  };

  const agregarUsuario = async () => {
    if (modoAcceso !== 'register') return;

    if (!formData.email || !formData.password || !formData.name || !formData.lastName1 || !formData.confirmPassword) {
      setMensaje('Llene todos los campos');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setMensaje('El correo electrónico debe tener un formato válido (ejemplo: usuario@dominio.com)');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-_])[A-Za-z\d@$!%*?&-_]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setMensaje('La contraseña debe tener un carácter especial, una mayúscula, una minúscula y un número por lo menos, y una longitud mínima de 8 caracteres');
      return;
    }

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
        setFormData({
          email: '',
          password: '',
          name: '',
          lastName1: '',
          lastName2: '',
          confirmPassword: ''
        });
        setModoAcceso('login');
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

    if (!formData.email || !formData.password) {
      setMensaje('Llene todos los campos');
      return;
    }

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

      if (response.ok) {
        const token = data.token;
        if (!token) {
          setMensaje('Error: No se recibió el token');
          return;
        }

        const usuario = jwtDecode(token);
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
          setModo={cambiarModo} // Usar la nueva función para cambiar modo
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