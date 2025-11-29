import { useState } from 'react';

export const useColectivos = () => {
  const [colectivos, setColectivos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const obtenerColectivos = async (endpoint) => {
    setCargando(true);
    setError(null);
    try {
      const response = await fetch(endpoint, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data !== undefined && data !== null) {
        setColectivos(data);
      } else {
        setColectivos([]);
      }
      
    } catch (error) {
      console.error('Error al obtener datos:', error);
      setError(error.message || 'Error al cargar los datos');
      setColectivos([]);
    } finally {
      setCargando(false);
    }
  };

  return { colectivos, cargando, error, obtenerColectivos };
};