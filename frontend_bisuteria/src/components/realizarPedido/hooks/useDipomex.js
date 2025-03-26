import { useState, useEffect } from 'react';

const useDipomex = (codigoPostal) => {
    const [datos, setDatos] = useState(null);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(false);

    const APIKEY = import.meta.env.VITE_DIPOMEX_API_KEY;

    console.log(APIKEY)

    const buscarDatosPorCodigoPostal = async (cp) => {
        if (!APIKEY) {
            setError('API Key no configurada');
            return;
        }

        setCargando(true);
        try {
            const response = await fetch(`https://api.tau.com.mx/dipomex/v1/codigo_postal?cp=${cp}`, {
                method: 'GET',
                headers: { 'APIKEY': APIKEY },
            });
            if (!response.ok) throw new Error('Código postal no válido');
            const data = await response.json();
            if (data.error) throw new Error(data.message || 'Error en la respuesta de la API');
            setDatos(data.codigoPostal);
            setError(null);
        } catch (err) {
            setError(err.message);
            setDatos(null);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        if (codigoPostal && codigoPostal.length === 5) {
            buscarDatosPorCodigoPostal(codigoPostal);
        } else {
            setDatos(null);
            setError(null);
        }
    }, [codigoPostal]);

    return { datos, error, cargando };
};

export default useDipomex;