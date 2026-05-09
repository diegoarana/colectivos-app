# ⚡ Quick Reference - Colectivos App

Guía rápida para las tareas más comunes.

---

## 🚀 Inicio Rápido

```bash
# Instalación
npm install

# Desarrollo
vercel dev              # Recomendado
npm start               # Alternativa

# Build
npm run build

# Deploy
vercel --prod
```

---

## 📁 Crear Nuevos Archivos

### Nuevo Screen (Pantalla)

```javascript
// src/components/screens/MiScreen.jsx
import React, { useEffect } from 'react';
import { useColectivos } from '../../hooks/useColectivos';
import { ENDPOINTS } from '../../constants/endpoints';
import { ErrorMessage } from '../ErrorMessage';

export const MiScreen = () => {
  const { colectivos, cargando, error, obtenerColectivos } = useColectivos();

  useEffect(() => {
    obtenerColectivos(ENDPOINTS.centro);
  }, []);

  return (
    <div className="p-4 md:p-6">
      {error && <ErrorMessage message={error} />}
      {cargando && <p>Cargando...</p>}
      {colectivos.length > 0 && (
        <div>
          {/* Renderizar colectivos */}
        </div>
      )}
    </div>
  );
};
```

### Agregar Ruta en App.js

```javascript
import { MiScreen } from './components/screens/MiScreen';

<Route path="/mi-ruta" element={<MiScreen />} />
```

### Nuevo Endpoint

```javascript
// src/constants/endpoints.js
export const ENDPOINTS = {
  // Existentes...
  miNuevoEndpoint: '/api/algo?parametro={valor}',
};
```

---

## 🎨 Estilos Comunes

### Card Estándar
```javascript
<div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
  {/* Contenido */}
</div>
```

### Botón
```javascript
<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
  Botón
</button>
```

### Grid Responsivo
```javascript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Items */}
</div>
```

### Flexbox Centrado
```javascript
<div className="flex items-center justify-center min-h-screen">
  {/* Contenido centrado */}
</div>
```

---

## 🪝 Patrones de Hooks

### useColectivos Básico
```javascript
const { colectivos, cargando, error, obtenerColectivos } = useColectivos();

useEffect(() => {
  obtenerColectivos(ENDPOINTS.centro);
}, []);
```

### useColectivos con Parámetro Dinámico
```javascript
const { parada } = useParams();
const { colectivos, cargando, error, obtenerColectivos } = useColectivos();

useEffect(() => {
  if (parada) {
    obtenerColectivos(
      ENDPOINTS.centro.replace('{idParada}', parada)
    );
  }
}, [parada]);
```

### useEffect para Navegación
```javascript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

const manejarClick = () => {
  navigate('/nueva-ruta');
};
```

---

## 🎯 Manejo de Estado

### Estado Booleano
```javascript
const [mostrarModal, setMostrarModal] = useState(false);

const manejarAbrir = () => setMostrarModal(true);
const manejarCerrar = () => setMostrarModal(false);
```

### Estado de Selección
```javascript
const [seleccionado, setSeleccionado] = useState(null);

const manejarSeleccionar = (id) => {
  setSeleccionado(id);
};
```

### Estado de Filtro
```javascript
const [filtro, setFiltro] = useState('todos');

const colectivosFiltrados = colectivos.filter(c => {
  if (filtro === 'todos') return true;
  return c.linea === filtro;
});
```

---

## 🔗 Navegación

### Link Simple
```javascript
import { Link } from 'react-router-dom';

<Link to="/ruta" className="text-blue-500 hover:underline">
  Ir a ruta
</Link>
```

### Navigate Programático
```javascript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

const manejarClick = () => {
  navigate('/ruta-nueva');
};
```

### Parámetros en Ruta
```javascript
// Ruta en App.js
<Route path="/linea/:linea" element={<LineScreen />} />

// En componente
import { useParams } from 'react-router-dom';

const { linea } = useParams();
```

---

## 🐛 Debugging

### Loguear Estado
```javascript
console.log('Colectivos:', colectivos);
console.log('Cargando:', cargando);
console.log('Error:', error);
```

### Loguear Props
```javascript
console.log('Props:', { colectivos, cargando, error });
```

### Loguear en useEffect
```javascript
useEffect(() => {
  console.log('Efecto ejecutado con dependencia:', parada);
  obtenerColectivos(endpoint);
}, [parada]);
```

### Revisar Network Tab
- DevTools → Network
- Ver requests a `/api/*`
- Verificar status code (200 = OK, 404 = Not Found, 500 = Error)

---

## 🧪 Testing

### Test Básico de Componente
```javascript
import { render, screen } from '@testing-library/react';
import { MiScreen } from './MiScreen';

test('renderiza el componente', () => {
  render(<MiScreen />);
  expect(screen.getByText(/texto esperado/)).toBeInTheDocument();
});
```

### Test de Click
```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('maneja click', async () => {
  const user = userEvent.setup();
  render(<Boton />);
  
  const boton = screen.getByRole('button');
  await user.click(boton);
  
  expect(screen.getByText(/resultado/)).toBeInTheDocument();
});
```

---

## 📝 Convenciones

### Nombres de Variables Booleanas
```javascript
const [esVisible, setEsVisible] = useState(false);
const [tieneCarga, setTieneCarga] = useState(true);
const [mostrarModal, setMostrarModal] = useState(false);
```

### Nombres de Funciones
```javascript
const manejarClick = () => {};
const manejarEnvio = () => {};
const manejarCambio = (e) => {};
const obtenerDatos = async () => {};
```

### Nombres de Arrays
```javascript
const colectivos = [];
const paradas = [];
const lineas = [];
```

---

## 🚨 Errores Comunes

### ❌ No usar endpoint centralizado
```javascript
// MALO
obtenerColectivos('/api/arribos?codLinea=0&idParada=LP2060');

// BIEN
import { ENDPOINTS } from '../constants/endpoints';
obtenerColectivos(ENDPOINTS.centro);
```

### ❌ Renderizar error sin componente
```javascript
// MALO
{error && <p style={{color: 'red'}}>{error}</p>}

// BIEN
{error && <ErrorMessage message={error} />}
```

### ❌ No manejo de dependencias en useEffect
```javascript
// MALO - Corre en cada render
useEffect(() => {
  obtenerColectivos(ENDPOINTS.centro);
});

// BIEN - Corre solo una vez
useEffect(() => {
  obtenerColectivos(ENDPOINTS.centro);
}, []);
```

### ❌ Hardcodear estilos
```javascript
// MALO
<div style={{padding: '16px', backgroundColor: '#fff'}}>

// BIEN
<div className="p-4 bg-white">
```

---

## ✅ Checklist de Feature Completa

- [ ] Crear componente con useColectivos
- [ ] Agregar ruta en App.js
- [ ] Centralizar endpoint en constants/
- [ ] Usar ErrorMessage para errores
- [ ] Mostrar loading state
- [ ] Estilos con Tailwind
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Probar en `vercel dev`
- [ ] Testing unitario
- [ ] Documentación en comments si es complejo
- [ ] Actualizar versión `npm version patch`

---

## 🔄 Workflows Típicos

### Agregar Nueva Pantalla
```
1. Crear archivo src/components/screens/MiScreen.jsx
2. Agregar componente
3. Importar en App.js
4. Agregar <Route> en App.js
5. Crear link/navigate a la ruta
6. Probar en vercel dev
```

### Agregar Nuevo Endpoint
```
1. Agregar entrada en src/constants/endpoints.js
2. En el Screen, importar ENDPOINTS
3. Usar en obtenerColectivos(ENDPOINTS.miNuevoEndpoint)
4. Testear en DevTools Network
```

### Cambiar Estilos
```
1. Abrir src/App.css o index.css
2. O usar clases Tailwind directamente en componente
3. Probar en vercel dev
4. Verificar responsive design
```

### Deploy a Producción
```
1. Verificar que todo funciona en npm start
2. npm run build (verificar sin errores)
3. vercel --prod
4. Esperar a que termine
5. Ver en URL de Vercel
```

---

## 🎨 Color Reference

| Línea | Código | Color Hex |
|-------|--------|-----------|
| 214 | 169 | Ver `colorsByLine.js` |
| 520 | 284 | Ver `colorsByLine.js` |
| 202 | 130 | Ver `colorsByLine.js` |

---

## 🌐 URL Reference

| Cosa | URL |
|------|-----|
| Local Dev | http://localhost:3000 (vercel dev) |
| Prod | https://colectivos-app.vercel.app |
| API | /api/arribos, /api/paradas-cercanas |
| GitHub | [Repo URL] |

---

## 📚 Archivos Importantes

| Archivo | Propósito |
|---------|----------|
| `src/App.js` | Punto de entrada, rutas |
| `src/hooks/useColectivos.js` | Lógica de fetching |
| `src/constants/endpoints.js` | URLs de API |
| `public/service-worker.js` | Cache offline |
| `.instructions.md` | Instrucciones para Copilot |
| `ARCHITECTURE.md` | Documentación de arquitectura |
| `README.md` | Documentación general |

---

## 🚀 Comandos rápidos

```bash
# Desarrollo
vercel dev

# Build
npm run build

# Bump versión
npm version patch     # 3.1.2 → 3.1.3
npm version minor     # 3.1.2 → 3.2.0
npm version major     # 3.1.2 → 4.0.0

# Deploy
vercel --prod

# Testing
npm test

# Instalar deps
npm install
```

---

**Última actualización:** Mayo 2026
