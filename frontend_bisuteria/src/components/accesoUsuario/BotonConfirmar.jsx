export function BotonConfirmar({ textoBoton, onClick }) {
    return (
      <button type="submit" className="boton-confirmar" onClick={onClick}>
        {textoBoton}
      </button>
    );
  }