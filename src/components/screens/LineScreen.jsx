import React, { useEffect } from 'react';
import { Bus, Clock, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useColectivos } from '../../hooks/useColectivos';
import { ErrorMessage } from '../ErrorMessage';
import { ButtonPanel } from '../ButtonPanel';
import { ENDPOINTS } from '../../constants/endpoints';
import { COLORS_BY_LINE } from '../../constants/colorsByLine';

export const LineScreen = () => {
  const { linea } = useParams();
  const navigate = useNavigate();
  const { colectivos, cargando, error, obtenerColectivos } = useColectivos();

  const endpoint = ENDPOINTS[`linea${linea}`];

  useEffect(() => {
    if (endpoint) {
      obtenerColectivos(endpoint);
    }
  }, [linea]);

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <div className="bg-purple-600 text-white p-6 shadow-lg">
        <button
          onClick={() => navigate('/casa')}
          className="flex items-center gap-2 mb-4 hover:opacity-80 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>

        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <Bus className="w-6 h-6" />
          Línea {linea} - Parada 7 y 49
        </h2>

      </div>
      
      <div className="p-4">

        <div className='flex justify-end pb-4'>
          <div className='text-right flex items-center gap-4'>
            <ButtonPanel />
          </div>
        </div>

        {cargando ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
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
                    <p className="text-sm text-gray-500">{colectivo.descripcionLinea}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-purple-600 font-bold text-lg">
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