import React from 'react';
import { AlertCircle, RefreshCw } from "lucide-react";

export const ErrorMessage = ({ mensaje, onReintentar }) => (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md w-full text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-red-800 mb-2">
          Servicio no disponible
        </h3>
        <p className="text-red-600 mb-6">
          {mensaje || 'No pudimos conectar con el servidor. Por favor, intenta nuevamente.'}
        </p>
        <button
          onClick={onReintentar}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2 mx-auto shadow-lg"
        >
          <RefreshCw className="w-5 h-5" />
          Reintentar
        </button>
      </div>
    </div>
  );
