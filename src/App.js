import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { HomeScreen } from './components/screens/HomeScreen';
import { CityCenterScreen } from './components/screens/CityCenterScreen';
import { LineSelectionScreen } from './components/screens/LineSelectionScreen';
import { LineScreen } from './components/screens/LineScreen';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/centro/:parada" element={<CityCenterScreen />} />
        <Route path="/casa" element={<LineSelectionScreen />} />
        <Route path="/linea/:linea" element={<LineScreen />} />
      </Routes>
    </HashRouter>
  );
}

export default App;