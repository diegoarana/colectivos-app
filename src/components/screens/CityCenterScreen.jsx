import React, { useEffect } from 'react';
import { MapPin, Clock, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useColectivos } from '../../hooks/useColectivos';
import { ErrorMessage } from '../ErrorMessage';
import { ButtonPanel } from '../ButtonPanel';
import { ENDPOINTS } from '../../constants/endpoints';
import { COLORS_BY_LINE } from '../../constants/colorsByLine';

const PARADAS = {
  'LP1647': '66 y 121',
  'LP1636': '122 y 77'
};

export const CityCenterScreen = () => {
  const { parada } = useParams();
  const navigate = useNavigate();
  const { colectivos, cargando, error, obtenerColectivos } = useColectivos();

  const endpoint = parada === 'LP1636' ? ENDPOINTS.angiToCentro : ENDPOINTS.centro;

  useEffect(() => {
    obtenerColectivos(endpoint);
  }, [parada]);

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <div className="bg-blue-600 text-white p-6 shadow-lg">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-4 hover:opacity-80 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>

        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <MapPin className="w-6 h-6" />
          Colectivos al Centro - Parada {PARADAS[parada] || parada}
        </h2>
      </div>
      
      <div className="p-4">

        <div className='flex justify-end pb-4'>
          <div className='text-right flex items-center gap-4'>
            <ButtonPanel onRefresh={() => obtenerColectivos(endpoint)} />
          </div>
        </div>

        {cargando ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <ErrorMessage 
            mensaje={error} 
            onReintentar={() => obtenerColectivos(endpoint)}
          />
        ) : (
          <div className="space-y-3">
            {colectivos.map((colectivo) => (
              <div
                key={colectivo.id}
                className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <div className={`bg-${COLORS_BY_LINE[colectivo.linea]}-600 text-white rounded-lg w-14 h-14 flex items-center justify-center font-bold text-lg`}>
                    {colectivo.linea}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{colectivo.destino}</p>
                    <p className="text-sm text-gray-500">Línea {colectivo.descripcionLinea}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-green-600 font-bold">
                    <Clock className="w-5 h-5" />
                    {colectivo.tiempo}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};