
import React from 'react';
import { Home, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ButtonPanel = ({ onRefresh }) => {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate('/')}
        className="bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2 mx-auto shadow-lg"
      >
        <Home className="w-5 h-5" />
      </button>
      <button
        onClick={onRefresh}
        className="bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2 mx-auto shadow-lg"
      >
        <RefreshCw className="w-5 h-5" />
      </button>  
    </>
  );
};