import React from 'react';
import { Home, ArrowLeft, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LineSelectionScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>
        
        <div className="text-center mb-8">
          <Home className="w-16 h-16 mx-auto text-purple-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Ir a Casa</h2>
          <p className="text-gray-600">Selecciona tu línea</p>
        </div>
        
        <div className="space-y-3">
          {['214', '520', '202'].map((linea) => (
            <button
              key={linea}
              onClick={() => navigate(`/linea/${linea}`)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl transition duration-200 text-xl shadow-lg"
            >
              Línea {linea}
            </button>
          ))}

            <button
              onClick={() => navigate('/from-matheu')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Stethoscope className={`w-5 h-5 animate-pulse`} />
              Desde 66 y 115
            </button>
            <button
              key={'31y66'}
              onClick={() => navigate(`/centro/LP2464`)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl transition duration-200 text-xl shadow-lg"
            >
              Desde 31 y 66
            </button>
        </div>
      </div>
    </div>
  );
};