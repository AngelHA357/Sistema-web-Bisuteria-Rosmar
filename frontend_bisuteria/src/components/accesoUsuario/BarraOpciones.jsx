export function BarraOpciones({ modo, setModo }) {
  return (
    <div className="barra-opciones">
      <div
        className={modo === 'login' ? 'activo' : ''}
        onClick={() => setModo('login')}
      >
        Iniciar sesión
      </div>
      <div
        className={modo === 'register' ? 'activo' : ''}
        onClick={() => {
          console.log("Cambiando modo a: register");
          setModo('register');
          }
        }
      >
        Registrarse
      </div>
    </div>
  );
}