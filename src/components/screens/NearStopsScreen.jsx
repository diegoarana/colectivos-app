import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, ArrowLeft } from 'lucide-react';

export const NearStopsScreen = () => {
  const navigate = useNavigate();
  const [paradas, setParadas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { latitude, longitude } = location.state || {};

  useEffect(() => {
    if (latitude && longitude) {
      obtenerParadasCercanas(latitude, longitude);
    }
  }, [latitude, longitude]);

  const obtenerParadasCercanas = async (latitude, longitude) => {
    setCargando(true);
    setError(null);
    try {
      const response = await fetch(
        '/api/paradas-cercanas',
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          latitud: latitude,
          longitud: longitude
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setParadas(data);
    } catch (error) {
      console.error('Error:', error);console.error('Error:', error);
      setError('No se pudieron cargar las paradas cercanas');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <div className="bg-green-600 text-white p-6 shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4 hover:opacity-80 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>

        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MapPin className="w-6 h-6" />
          Paradas Cercanas
        </h2>
      </div>

      <div className="p-4">
        {cargando ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => obtenerParadasCercanas(latitude, longitude)}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Reintentar
            </button>
          </div>
        ) : paradas.length > 0 ? (
          <div className="space-y-3">
            {paradas.map((parada) => (
              <div
                key={parada.id}
                onClick={() => navigate(`/paradas/${parada.identificador}`, {
                  state: { intersection: `${parada.callePrincipal} y ${parada.calleInterseccion}` }
                })}
                className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition cursor-pointer"
              >
                <p className="font-semibold text-gray-800">
                  {parada.callePrincipal} y {parada.calleInterseccion}
                </p>
                <p className="text-sm text-gray-500">Parada: {parada.identificador}</p>
                <p className="text-xs text-gray-400">{parada.lineas}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-8">No hay paradas cercanas</p>
        )}
      </div>
    </div>
  );
};