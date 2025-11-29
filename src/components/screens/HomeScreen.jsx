import React, { useState, useEffect } from 'react';
import { Bus, Home, MapPin, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HomeScreen = () => {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [mostrarBotonInstalar, setMostrarBotonInstalar] = useState(false);

  // Capturar evento de instalación PWA
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setMostrarBotonInstalar(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Verificar si ya está instalada
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setMostrarBotonInstalar(false);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // Función para instalar la PWA
  const instalarPWA = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setMostrarBotonInstalar(false);
    }
    
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Bus className="w-16 h-16 mx-auto text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Colectivos</h1>
          <p className="text-gray-600">¿A dónde vas?</p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate('/centro/LP1647')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-3 shadow-lg"
          >
            <MapPin className="w-5 h-5" />
            IR AL CENTRO
          </button>
          
          <button
            onClick={() => navigate('/casa')}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-3 shadow-lg"
          >
            <Home className="w-5 h-5" />
            IR A CASA
          </button>
          
          <button
            onClick={() => navigate('/centro/LP1636')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-4 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-3 shadow-lg"
          >
            <MapPin className="w-5 h-5" />
            IR AL CENTRO DESDE 122 y 77
          </button>

          {mostrarBotonInstalar && (
            <button
              onClick={instalarPWA}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-3 shadow-lg border-2 border-green-400"
            >
              <Download className="w-5 h-5" />
              INSTALAR APP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};