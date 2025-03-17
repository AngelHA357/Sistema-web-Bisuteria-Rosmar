export function CampoDato({ tipo, nombre, value, onChange, name }) {
    return (
      <div className="campo-dato">
        <label>{nombre}</label>
        <input
          type={tipo}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={nombre}
        />
      </div>
    );
  }