import { useState, useEffect } from 'react';

const direccionCP = (codigoPostal) => {
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (!codigoPostal || codigoPostal.length !== 5) {
      setDatos(null);
      setError(null);
      setCargando(false);
      return;
    }

    const fetchData = async () => {
      setCargando(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/direccion/codigo_postal?cp=${codigoPostal}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Error al obtener los datos del código postal');
        }

        const data = await response.json();
        setDatos(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setDatos(null);
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, [codigoPostal]);

  return { datos, error, cargando };
};

export default direccionCP;