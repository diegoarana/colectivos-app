import React, { useState, useEffect } from 'react';
import { Bus, Home, MapPin, Clock, ArrowLeft, RefreshCw, AlertCircle, Download } from 'lucide-react';

const ENDPOINTS = {
  centro: '/api/arribos?codLinea=0&idParada=LP1647',
  linea214: '/api/arribos?codLinea=169&idParada=LP2060',
  linea520: '/api/arribos?codLinea=284&idParada=LP2065',
  linea202: '/api/arribos?codLinea=130&idParada=LP2065'
};

function App() {
  const [pantalla, setPantalla] = useState('inicio');
  const [colectivos, setColectivos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [mostrarBotonInstalar, setMostrarBotonInstalar] = useState(false);
  //TODO: poner logica de mapeado de request en funcion serverless asi no mapeamos en el front
  //TODO: arreglar header con titulo y botones de refresh e ir a inicio

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

  const obtenerColectivos = async (endpoint, esHorarios = false) => {
    setCargando(true);
    setError(null);
    try {

      const response = await fetch(endpoint, {
        method: 'GET'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.arribos !== undefined && data.arribos !== null) {

        const colectivosFormateados = data.arribos.map((item, index) => ({
          id: index + 1,
          linea: item.descripcionLinea.split(" ")[1],
          descripcionLinea: item.descripcionLinea,
          tiempo: item.tiempoRestanteArribo,
          destino: item.descripcionBandera
        }));

        setColectivos(colectivosFormateados);
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

  useEffect(() => {
    if (pantalla === 'centro') {
      obtenerColectivos(ENDPOINTS.centro);
    } else if (pantalla === 'linea214') {
      obtenerColectivos(ENDPOINTS.linea214, true);
    } else if (pantalla === 'linea520') {
      obtenerColectivos(ENDPOINTS.linea520, true);
    } else if (pantalla === 'linea202') {
      obtenerColectivos(ENDPOINTS.linea202, true);
    }
  }, [pantalla]);

  // Pantalla de Inicio
  const PantallaInicio = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Bus className="w-16 h-16 mx-auto text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Colectivos</h1>
          <p className="text-gray-600">¿A dónde vas?</p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => setPantalla('centro')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-3 shadow-lg"
          >
            <MapPin className="w-5 h-5" />
            IR AL CENTRO
          </button>
          
          <button
            onClick={() => setPantalla('casa')}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-3 shadow-lg"
          >
            <Home className="w-5 h-5" />
            IR A CASA
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

  //TODO: ver si se puede cambiar por un objeto

  const getColorFromLinea = (linea) => {
    const lineaNum = parseInt(linea, 10);
    if ([214].includes(lineaNum)) return 'red';
    if ([520].includes(lineaNum)) return 'yellow';
    if ([202].includes(lineaNum)) return 'orange';
    return 'blue';
  }

  const PantallaCentro = () => (
    <div className="min-h-screen bg-gray-50 pb-6">
      <div className="bg-blue-600 text-white p-6 shadow-lg">
        <button
          onClick={() => setPantalla('inicio')}
          className="flex items-center gap-2 mb-4 hover:opacity-80 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>

        <div className='flex items-center justify-between'>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            Colectivos al Centro - Parada 66 y 121
          </h2>
          <div className='text-right flex items-center gap-4'>
            <BotoneraHeader />
          </div>
        </div>        
      </div>
      
      <div className="p-4">
        {cargando ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          error ? (
            <ComponenteError 
              mensaje={error} 
              onReintentar={() => obtenerColectivos(ENDPOINTS.centro)}
            />
          ) :
          <div className="space-y-3">
            {colectivos.map((colectivo) => (
              <div
                key={colectivo.id}
                className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <div className={`bg-${getColorFromLinea(colectivo.linea)}-600 text-white rounded-lg w-14 h-14 flex items-center justify-center font-bold text-lg`}>
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
        )
        
        }
      </div>
    </div>
  );

  // Pantalla Casa (selector de líneas)
  const PantallaCasa = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <button
          onClick={() => setPantalla('inicio')}
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
              onClick={() => setPantalla(`linea${linea}`)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl transition duration-200 text-xl shadow-lg"
            >
              Línea {linea}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Pantalla de Horarios por Línea
  const PantallaLinea = () => {
    const numeroLinea = pantalla.replace('linea', '');
    return (
      <div className="min-h-screen bg-gray-50 pb-6">
        <div className="bg-purple-600 text-white p-6 shadow-lg">
          <button
            onClick={() => setPantalla('casa')}
            className="flex items-center gap-2 mb-4 hover:opacity-80 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>
          <div className='flex items-center justify-between'>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Bus className="w-6 h-6" />
              Línea {numeroLinea} - Parada 7 y 49
            </h2>
            <div className='text-right flex items-center gap-4'>
              <BotoneraHeader />
            </div>
          </div>

        </div>
        
        <div className="p-4">
          {cargando ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : error ? (
          <ComponenteError 
              mensaje={error} 
              onReintentar={() => {
                if (pantalla === 'linea214') obtenerColectivos(ENDPOINTS.linea214);
                else if (pantalla === 'linea520') obtenerColectivos(ENDPOINTS.linea520);
                else if (pantalla === 'linea202') obtenerColectivos(ENDPOINTS.linea202);
              }}
          />) : (
            <div className="space-y-3">
              {colectivos.map((colectivo) => (
                <div
                  key={colectivo.id}
                  className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-4">
                    <div className={`bg-${getColorFromLinea(colectivo.linea)}-600 text-white rounded-lg w-14 h-14 flex items-center justify-center font-bold text-lg`}>
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

    // Componente de Error
  const ComponenteError = ({ mensaje, onReintentar }) => (
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

  const BotoneraHeader = () => (
    <>
      <button
        onClick={() => setPantalla('inicio')}
        className="bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2 mx-auto shadow-lg"
      >
        <Home className="w-5 h-5" />
      </button>
      <button
        onClick={() => obtenerColectivos(ENDPOINTS[pantalla])}
        className="bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2 mx-auto shadow-lg"
      >
        <RefreshCw className="w-5 h-5" />
      </button>  
    </>
  );

  // Renderizado condicional según la pantalla actual
  return (
    <>
      {pantalla === 'inicio' && <PantallaInicio />}
      {pantalla === 'centro' && <PantallaCentro />}
      {pantalla === 'casa' && <PantallaCasa />}
      {(pantalla === 'linea214' || pantalla === 'linea520' || pantalla === 'linea202') && <PantallaLinea />}
    </>
  );
}

export default App;