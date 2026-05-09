# 🗺️ Mapa Visual del Proyecto

Representación visual de la estructura y flujos del proyecto Colectivos App.

---

## 📊 Árbol de Componentes

```
App.js (HashRouter)
│
├── HomeScreen (/)
│   ├── Botón: Ir al Centro → CityCenterScreen
│   ├── Botón: Volver a Casa → LineSelectionScreen
│   ├── Botón: Paradas Cercanas → NearStopsScreen
│   └── Botón: Matheu → FromMatheuScreen
│
├── CityCenterScreen (/centro/:parada)
│   └── useColectivos → ENDPOINTS.centro
│       └── ButtonPanel x N (colectivos)
│
├── LineSelectionScreen (/casa)
│   ├── Línea 214 → LineScreen(/linea/214)
│   ├── Línea 520 → LineScreen(/linea/520)
│   └── Línea 202 → LineScreen(/linea/202)
│
├── LineScreen (/linea/:linea)
│   └── useColectivos → ENDPOINTS.linea
│       └── ButtonPanel x N
│
├── NearStopsScreen (/paradas-cercanas)
│   ├── Geolocalización (GPS)
│   └── useColectivos → ENDPOINTS.getNearStops
│       └── StopScreen (/paradas/:id)
│
├── FromMatheuScreen (/from-matheu)
│   └── useColectivos → ENDPOINTS.angiToCentro
│
└── StopScreen (/paradas/:id)
    └── useColectivos → ENDPOINTS.getBusesByStop
        └── ButtonPanel x N
```

---

## 🔄 Flujo de Datos Principal

```
USER INTERACTION
       ↓
   HomeScreen
       ↓
  Navigate to Screen
       ↓
  Screen Component Mounted
       ↓
  Call useColectivos Hook
       ↓
  obtenerColectivos(ENDPOINT)
       ↓
  fetch() to /api/...
       ↓
  API Returns Array
       ↓
  Update State
       ↓
  Render with ButtonPanel/Components
       ↓
   USER SEES RESULTS
```

---

## 🧩 Estructura de Carpetas

```
colectivos-app/
│
├── 📄 README.md              ← Start here
├── 📄 ARCHITECTURE.md        ← Deep dive
├── 📄 QUICK_REFERENCE.md     ← Copy-paste code
├── 📄 .instructions.md       ← For Copilot
├── 📄 .prompt.md             ← Copilot behavior
│
├── 📁 public/
│   ├── index.html
│   ├── manifest.json         ← PWA config
│   └── service-worker.js     ← Offline + updates
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 screens/       ← Pages
│   │   │   ├── HomeScreen
│   │   │   ├── CityCenterScreen
│   │   │   ├── LineScreen
│   │   │   ├── NearStopsScreen
│   │   │   └── StopScreen
│   │   ├── ButtonPanel.jsx   ← Reusable
│   │   └── ErrorMessage.jsx  ← Reusable
│   │
│   ├── 📁 hooks/
│   │   └── useColectivos.js  ← Data fetching
│   │
│   ├── 📁 constants/
│   │   ├── endpoints.js      ← API URLs
│   │   └── colorsByLine.js   ← Color mapping
│   │
│   ├── App.js                ← Routes
│   └── index.js              ← Entry point
│
└── ⚙️ Config files
    ├── package.json
    ├── tailwind.config.js
    ├── vercel.json
    └── postcss.config.js
```

---

## 🔌 API Endpoints

```
ENDPOINTS (en src/constants/endpoints.js)
│
├── centro
│   └── /api/arribos?codLinea=0&idParada={idParada}
│
├── linea214
│   └── /api/arribos?codLinea=169&idParada=LP2060
│
├── linea520
│   └── /api/arribos?codLinea=284&idParada=LP2065
│
├── linea202
│   └── /api/arribos?codLinea=130&idParada=LP2065
│
├── angiToCentro
│   └── /api/arribos?codLinea=0&idParada=LP 1636
│
├── getNearStops
│   └── /api/paradas-cercanas
│
└── getBusesByStop
    └── /api/arribos?codLinea={codLinea}&idParada={idParada}
```

---

## 🎯 Rutas de React Router

```
Hash Router Routes
│
├── / 
│   └── HomeScreen
│       (Menú principal)
│
├── /centro/:parada
│   └── CityCenterScreen
│       (Colectivos al centro)
│
├── /casa
│   └── LineSelectionScreen
│       (Selector de línea)
│
├── /linea/:linea
│   └── LineScreen
│       (Detalles de línea)
│
├── /paradas-cercanas
│   └── NearStopsScreen
│       (Paradas cercanas por GPS)
│
├── /paradas/:id
│   └── StopScreen
│       (Detalle de parada)
│
└── /from-matheu
    └── FromMatheuScreen
        (Desde Matheu)
```

---

## 🪝 Hook useColectivos

```
useColectivos()
│
├── STATE
│   ├── colectivos: Array
│   ├── cargando: Boolean
│   └── error: String|null
│
├── FUNCIÓN
│   └── obtenerColectivos(endpoint)
│       │
│       ├── 1. setCargando(true)
│       ├── 2. fetch(endpoint)
│       ├── 3. Si OK → setColectivos(data)
│       ├── 4. Si ERROR → setError(msg)
│       └── 5. Finalmente → setCargando(false)
│
└── RETORNA
    └── { colectivos, cargando, error, obtenerColectivos }
```

---

## 🎨 Stack Tecnológico

```
Frontend
├── React 19.2.0
├── React Router DOM 7.9.6
├── Tailwind CSS 3.4.18
│   ├── PostCSS
│   └── Autoprefixer
├── Lucide React 0.554.0 (Icons)
└── React Testing Library 16.3.0

PWA
├── Service Worker
├── Manifest.json
└── Web App

Build & Deploy
├── React Scripts 5.0.1
└── Vercel

Development
├── Node 22.21.0
├── npm scripts
└── Vercel CLI
```

---

## 🔐 PWA Features

```
PWA Capabilities
│
├── INSTALL
│   └── beforeinstallprompt event
│       └── deferredPrompt.prompt()
│
├── OFFLINE
│   └── Service Worker
│       ├── Cache resources
│       └── Serve from cache
│
├── UPDATES
│   └── Service Worker detects new version
│       ├── Shows notification
│       └── User can reload
│
└── RESPONSIVE
    └── Works on mobile, tablet, desktop
```

---

## 📈 Flujo de Actualización

```
User Opens App
     ↓
Service Worker Checks for Updates
     ↓
New Version Detected?
     ├─ NO → Continue as normal
     └─ YES → Show notification
            ↓
      User Clicks "Update"
            ↓
      Page Reloads
            ↓
      New Version Active ✅
```

---

## 🚀 Deploy Flow

```
Developer
   ↓
git push
   ↓
Vercel Detected Changes
   ↓
npm run build
   ↓
Upload to Vercel
   ↓
Production Live
   ↓
Service Worker Detects Version
   ↓
Notifies Active Users ✅
```

---

## 🧪 Testing Structure

```
src/
├── components/
│   └── screens/
│       └── HomeScreen.jsx
│           ↓
│       HomeScreen.test.js (Same folder)
│
└── hooks/
    └── useColectivos.js
        ↓
    useColectivos.test.js (Same folder)
```

---

## 📊 Estado de la Aplicación

```
useColectivos Hook State Machine
│
┌─ INITIAL
│  ├─ colectivos: []
│  ├─ cargando: false
│  └─ error: null
│
├─ LOADING
│  ├─ colectivos: []
│  ├─ cargando: true
│  └─ error: null
│
├─ SUCCESS
│  ├─ colectivos: [...]
│  ├─ cargando: false
│  └─ error: null
│
└─ ERROR
   ├─ colectivos: []
   ├─ cargando: false
   └─ error: "Error message"
```

---

## 🎨 Color System

```
Theme Colors
│
├── Primary
│   └── Blue (#3B82F6)
│
├── Status
│   ├── Success (Green)
│   ├── Error (Red)
│   ├── Warning (Yellow)
│   └── Info (Blue)
│
├── Neutral
│   ├── White (backgrounds)
│   ├── Gray (text, borders)
│   └── Black (text)
│
└── By Line
    ├── Línea 214 → Color custom
    ├── Línea 520 → Color custom
    └── Línea 202 → Color custom
```

---

## 🔄 Component Lifecycle

```
Screen Component (Typical)
│
├── 1. IMPORT
│   ├── useColectivos
│   ├── ENDPOINTS
│   └── Components (ErrorMessage, ButtonPanel)
│
├── 2. INITIALIZE
│   ├── useParams() for URL params
│   └── useColectivos() for data
│
├── 3. EFFECT
│   └── useEffect(() => {
│       obtenerColectivos(endpoint)
│     }, [dependency])
│
├── 4. CONDITIONAL RENDER
│   ├── IF error → ErrorMessage
│   ├── IF cargando → Loading
│   ├── IF colectivos → Map & render
│   └── ELSE → No results
│
└── 5. RETURN JSX
    └── Complete component
```

---

## 🎯 Patrones de Diseño Usados

```
Design Patterns
│
├── Custom Hook Pattern
│   └── useColectivos (centraliza lógica)
│
├── Component Composition
│   └── ButtonPanel, ErrorMessage (reusables)
│
├── Separation of Concerns
│   ├── Screens (UI)
│   ├── Hooks (Logic)
│   └── Constants (Data)
│
├── Error Boundary Pattern
│   └── ErrorMessage component
│
├── Loading State Pattern
│   └── Conditional rendering
│
└── Progressive Enhancement
    └── PWA que mejora con actualizaciones
```

---

## 📝 Documentation Map

```
Documentation Files
│
├── README.md
│   └── Overview + Getting Started
│
├── ARCHITECTURE.md
│   └── Deep dive into structure
│
├── QUICK_REFERENCE.md
│   └── Copy-paste code snippets
│
├── .instructions.md
│   └── Detailed guidelines for development
│
├── .prompt.md
│   └── Copilot behavior configuration
│
└── Este archivo (Mapa Visual)
    └── Visual reference of everything
```

---

## ✅ Quick Checklist para Features Nuevas

```
New Feature Checklist
│
├── [ ] Crear archivo src/components/screens/NuevaScreen.jsx
├── [ ] Importar en App.js
├── [ ] Agregar <Route> en App.js
├── [ ] Usar useColectivos hook
├── [ ] Centralizar endpoint en constants/endpoints.js
├── [ ] Manejo error, loading, success
├── [ ] Usar ErrorMessage para errores
├── [ ] Estilos con Tailwind
├── [ ] Responsive design
├── [ ] Probar en vercel dev
├── [ ] Actualizar versión
└── [ ] Hacer commit
```

---

## 🌍 Ambiente

```
Development Environment
│
├── Local
│   ├── vercel dev (recomendado)
│   └── npm start
│
├── Production
│   └── Vercel (automático)
│
└── Version Control
    └── npm version [major|minor|patch]
```

---

**Última actualización:** Mayo 2026  
**Versión del Proyecto:** 3.1.2  
**Node Required:** 22.21.0
