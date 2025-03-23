import logoBisuteria from '/imgs/logo_bisuteria_acceso_usuario.png';
import { CampoDato } from './CampoDato';
import { BarraOpciones } from './BarraOpciones';
import { BotonConfirmar } from './botonConfirmar';
import './accesoUsuarioStyles.css';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export function AccesoUsuario() {
    const navigate = useNavigate();
    const [modoAcceso, setModoAcceso] = useState('login');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        lastName: '',
        confirmPassword: ''
    });
    const [usuarios, setUsuarios] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [logueado, setLogueado] = useState(false);

    useEffect(() => {
        fetch('/src/mocks/clientes.json') 
          .then((response) => response.json())
          .then((data) => setUsuarios(data))
          .catch((error) => console.error('Error cargando usuarios:', error));
      }, []);

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

    const agregarUsuario = () => {
        if (modoAcceso !== 'register') return;
    
        if (formData.password !== formData.confirmPassword) {
          setMensaje('Las contraseñas no coinciden');
          return;
        }
    
        const nuevoUsuario = {
          id: usuarios.length + 1,
          correo: formData.email,
          contrasena: formData.password,
          nombre: formData.name,
          apellidoPaterno: formData.lastName,
          apellidoMaterno: ""
        };

        setUsuarios([...usuarios, nuevoUsuario]);
        setMensaje('Usuario registrado con éxito');
        setFormData({ email: '', password: '', name: '', lastName: '', confirmPassword: '' }); 
      };

      const verificarLogin = () => {
        if (modoAcceso !== 'login') return;
    
        const usuario = usuarios.find(
          (u) => u.correo === formData.email && u.contrasena === formData.password
        );
    
        if (usuario) {
          setMensaje('Inicio de sesión exitoso');
          setLogueado(true);
          navigate('/catalogo'); 
        } else {
          setMensaje('Correo o contraseña incorrectos');
        }
      };

      const handleSubmit = () => {
        modoAcceso === 'login' ? verificarLogin() : agregarUsuario();
      };

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