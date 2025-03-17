export function BotonConfirmar({ textoBoton, onClick }) {
    return (
      <button className="boton-confirmar" onClick={onClick}>
        {textoBoton}
      </button>
    );
  }