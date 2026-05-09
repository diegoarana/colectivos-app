# 🏛️ Arquitectura - Colectivos App

Documentación detallada de la arquitectura del proyecto.

---

## 🗂️ Estructura de Directorios Completa

```
colectivos-app/
│
├── 📄 public/                              # Archivos públicos y PWA
│   ├── index.html                          # HTML principal
│   ├── manifest.json                       # Configuración PWA (instalación, icons)
│   ├── robots.txt                          # SEO
│   └── service-worker.js                   # Service Worker para offline
│
├── 📁 src/
│   │
│   ├── 📁 components/
│   │   ├── 📁 screens/                     # Componentes de página/ruta
│   │   │   ├── HomeScreen.jsx              # 🏠 Menú principal
│   │   │   ├── CityCenterScreen.jsx        # 🏢 Paradas al centro
│   │   │   ├── FromMatheuScreen.jsx        # 📍 Desde Matheu
│   │   │   ├── LineSelectionScreen.jsx     # 🚌 Seleccionar línea
│   │   │   ├── LineScreen.jsx              # 🛣️ Detalles de línea
│   │   │   ├── NearStopsScreen.jsx         # 📍 Paradas cercanas (GPS)
│   │   │   └── StopScreen.jsx              # 🎯 Detalle de parada
│   │   │
│   │   ├── ButtonPanel.jsx                 # Botones reutilizables
│   │   └── ErrorMessage.jsx                # Componente de errores
│   │
│   ├── 📁 constants/
│   │   ├── endpoints.js                    # 🔗 URLs de API
│   │   └── colorsByLine.js                 # 🎨 Colores por línea
│   │
│   ├── 📁 hooks/
│   │   └── useColectivos.js                # 🪝 Hook principal de datos
│   │
│   ├── App.js                              # 🎯 Componente raíz + rutas
│   ├── App.css                             # Estilos específicos
│   ├── index.js                            # Punto de entrada
│   ├── index.css                           # Estilos globales
│   └── setupTests.js                       # Configuración de tests
│
├── 📁 api/                                 # Funciones API locales (Vercel)
│   ├── arribos.js                          # GET /api/arribos
│   └── paradas-cercanas.js                 # GET /api/paradas-cercanas
│
├── 📁 build/                               # 🔨 Compilado de producción
│   └── static/
│       ├── css/
│       └── js/
│
├── ⚙️ Configuración
│   ├── tailwind.config.js                  # Configuración Tailwind
│   ├── postcss.config.js                   # Configuración PostCSS
│   ├── vercel.json                         # Configuración Vercel
│   ├── package.json                        # Dependencias y scripts
│   ├── .instructions.md                    # 📋 Este archivo (para Copilot)
│   ├── ARCHITECTURE.md                     # 🏛️ Arquitectura (este archivo)
│   └── README.md                           # 📖 Documentación
```

---

## 🔄 Flujo de Datos

### Desde la Perspectiva del Usuario

```
HomeScreen
    ↓
Usuario selecciona una opción
    ↓
Navigate a Screen específica
    ↓
Screen carga useColectivos hook
    ↓
Hook llama a obtenerColectivos(endpoint)
    ↓
Fetch a API endpoint
    ↓
API retorna array de colectivos
    ↓
Hook actualiza estado y retorna datos
    ↓
Screen renderiza ButtonPanel o componentes con datos
```

### Ejemplo Práctico: Ir al Centro

```
HomeScreen 
  → click en "Ir al Centro"
  → navigate("/centro/LP2060")
  → CityCenterScreen mounted
  → useColectivos.obtenerColectivos(ENDPOINTS.centro)
  → fetch("/api/arribos?codLinea=0&idParada=LP2060")
  → Array de colectivos recibido
  → Estado actualizado
  → Render lista de colectivos con ButtonPanel
```

---

## 🎯 Componentes Principales

### HomeScreen (`src/components/screens/HomeScreen.jsx`)

**Propósito:** Menú principal y lógica PWA

**Características:**
- Detecta si la PWA está instalada
- Muestra botón de instalación si no está instalada
- Acceso a ubicación del usuario (geolocalización)
- Navegación a las diferentes pantallas

**Botones principales:**
- 🏢 Ir al Centro
- 🚌 Volver a Casa
- 📍 Paradas Cercanas
- etc.

---

### CityCenterScreen (`src/components/screens/CityCenterScreen.jsx`)

**Propósito:** Mostrar colectivos hacia el centro

**Flow:**
1. Recibe `parada` por params (`:parada`)
2. Carga `useColectivos`
3. Fetcha `ENDPOINTS.centro` con la parada
4. Renderiza lista de ButtonPanel con horarios

---

### useColectivos Hook (`src/hooks/useColectivos.js`)

**Estado que maneja:**
```javascript
{
  colectivos: [],        // Array de colectivos
  cargando: boolean,     // true mientras fetcha
  error: string | null,  // Mensaje de error si falla
  obtenerColectivos()    // Función para iniciar fetch
}
```

**Responsabilidades:**
- Fetching de datos
- Manejo de loading state
- Manejo de errores
- Reset de estado

**Patrón de uso:**
```javascript
const { colectivos, cargando, error, obtenerColectivos } = useColectivos();

useEffect(() => {
  obtenerColectivos(endpoint);
}, [endpoint]);
```

---

## 🌍 Endpoints de API

Todos centralizados en `src/constants/endpoints.js`:

| Endpoint | Método | Parámetros | Devuelve |
|----------|--------|-----------|----------|
| `/api/arribos` | GET | `codLinea`, `idParada` | Array de colectivos |
| `/api/paradas-cercanas` | GET | Geolocalización | Array de paradas cercanas |

### Códigos de Líneas Conocidos
- `0` - Todas las líneas (general)
- `169` - Línea 214
- `284` - Línea 520
- `130` - Línea 202

### IDs de Paradas Conocidas
- `LP2060` - Parada para línea 214
- `LP2065` - Parada para línea 520 y 202
- `LP 1636` - Angi to Centro

---

## 🚦 Ruteo (React Router)

Configurado en `src/App.js` con `HashRouter`:

| Ruta | Componente | Parámetros | Descripción |
|------|-----------|-----------|-------------|
| `/` | HomeScreen | - | Pantalla principal |
| `/centro/:parada` | CityCenterScreen | `parada` | Colectivos al centro |
| `/from-matheu` | FromMatheuScreen | - | Desde zona Matheu |
| `/casa` | LineSelectionScreen | - | Selector línea a casa |
| `/linea/:linea` | LineScreen | `linea` | Detalles de línea |
| `/paradas-cercanas` | NearStopsScreen | - | GPS + paradas cercanas |
| `/paradas/:id` | StopScreen | `id` | Detalle de parada |

**Nota:** Se usa `HashRouter` para compatibilidad con Vercel (URLs con `#`)

---

## 🎨 Sistema de Estilos

### Tailwind CSS
- **Archivo config:** `tailwind.config.js`
- **PostCSS:** `postcss.config.js`
- **Estilos globales:** `src/index.css`
- **Estilos específicos:** `src/App.css`

### Colores por Línea
```javascript
// src/constants/colorsByLine.js
{
  "214": "#FF5733",  // Línea 214 - color específico
  "520": "#33B1FF",  // Línea 520 - color específico
  // ...
}
```

### Approach Mobile-First
```javascript
// ✅ Correcto
<div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-lg md:text-xl lg:text-2xl">Título</h1>
</div>

// ❌ Incorrecto
<div className="p-8">
  <h1 className="text-2xl">Título</h1>
</div>
```

---

## 🔐 PWA (Progressive Web App)

### Service Worker
- **Archivo:** `public/service-worker.js`
- **Responsabilidades:**
  - Caché de recursos
  - Funcionalidad offline
  - Detección de actualizaciones
  - Notificaciones de actualización

### Manifest
- **Archivo:** `public/manifest.json`
- **Contiene:**
  - Nombre de la app
  - Icono de instalación
  - Temas de color
  - Orientación pantalla

### Instalación PWA
Se maneja en `HomeScreen`:
```javascript
// Evento beforeinstallprompt
window.addEventListener('beforeinstallprompt', handler);

// Botón de instalación muestra el prompt
deferredPrompt.prompt();
```

---

## 📦 Dependencias Clave

```json
{
  "react": "^19.2.0",              // Framework UI
  "react-router-dom": "^7.9.6",    // Routing con HashRouter
  "tailwindcss": "^3.4.18",        // Estilos CSS
  "lucide-react": "^0.554.0",      // Icons
  "react-scripts": "5.0.1"         // Build tool (Create React App)
}
```

---

## 🔄 Ciclo de Vida Típico

### Desarrollo
```
npm install
↓
vercel dev (o npm start)
↓
Modificar código
↓
Auto-reload en navegador
↓
Probar funcionalidad
```

### Build & Deploy
```
npm run build
↓
Genera carpeta /build
↓
vercel --prod
↓
Deploy en Vercel
↓
Service Worker detecta cambios
↓
Notifica a usuarios de actualización
```

---

## 🧪 Testing

**Framework:** React Testing Library  
**Ejecutar:** `npm test`

**Archivos de test:**
- `src/App.test.js`
- Crear archivos `.test.js` o `.test.jsx` para componentes

---

## 🌐 Deployment

**Plataforma:** Vercel

**Configuración en `vercel.json`:**
- Build command: `npm run build`
- Output directory: `build/`
- Node version: 22.21.0

**Proceso:**
1. Push a repositorio
2. Vercel detecta cambios
3. Ejecuta `npm run build`
4. Deploy automático
5. Service Worker detecta versión nueva
6. Notifica a usuarios

---

## 🛠️ Tecnología Stack Resumen

```
Frontend:         React 19 + JSX
Routing:          React Router DOM (HashRouter)
Styling:          Tailwind CSS + PostCSS
Icons:            Lucide React
Data Fetching:    Fetch API nativa (en useColectivos)
State Management: React Hooks (useState, useEffect)
Build:            React Scripts (CRA)
PWA:              Service Worker + Manifest
Deployment:       Vercel
Testing:          React Testing Library
Versioning:       npm versioning
```

---

## 📊 Métricas

- **Versión Actual:** 3.1.2 (3 = major, 1 = minor, 2 = patch)
- **Node Requerido:** 22.21.0
- **Navegadores:** Moderni (>0.2% de uso global)
- **Size:** Optimizado para PWA

---

## 🎯 Próximas Mejoras (TODO)

- [ ] Sistema de notificaciones push
- [ ] Caché más inteligente
- [ ] Modo oscuro
- [ ] Múltiples idiomas
- [ ] Historial de búsquedas
- [ ] Favoritos de paradas
- [ ] Dashboard de estadísticas

---

**Última actualización:** Mayo 2026
