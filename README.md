# 🚌 Colectivos App

Progressive Web App (PWA) desarrollada con React para encontrar colectivos (transporte público) en La Paz, Bolivia. La app está optimizada para consultar paradas de interés para ir al centro y volver a casa de manera rápida y simple.

**Versión:** 3.1.2  
**Node requerido:** 22.21.0  
**Deployed:** Vercel  

---

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Stack Tecnológico](#stack-tecnológico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración del Entorno](#configuración-del-entorno)
- [Cómo Ejecutar](#cómo-ejecutar)
- [Rutas Disponibles](#rutas-disponibles)
- [API Endpoints](#api-endpoints)
- [Características Principales](#características-principales)
- [TODO](#todo)

---

## 🎯 Descripción General

**Colectivos App** es una aplicación web pensada para usuarios que necesitan información rápida sobre autobuses en La Paz. La aplicación:

- ✅ Se enfoca únicamente en paradas de interés (Centro, Matheu, Casa)
- ✅ Funciona como PWA (instalable en dispositivos)
- ✅ Detecta ubicación actual y muestra paradas cercanas
- ✅ Permite consultar horarios de llegada de colectivos
- ✅ Notifica automáticamente sobre actualizaciones disponibles
- ✅ Funciona offline con Service Worker

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología |
|-----------|-----------|
| **Framework** | React 19.2.0 |
| **Router** | React Router DOM 7.9.6 |
| **Styling** | Tailwind CSS 3.4.18 + PostCSS |
| **Icons** | Lucide React 0.554.0 |
| **Build Tool** | React Scripts 5.0.1 |
| **Testing** | React Testing Library 16.3.0 |
| **Deployment** | Vercel |
| **PWA** | Service Worker + Web Manifest |

---

## 📁 Estructura del Proyecto

```
colectivos-app/
├── public/                          # Archivos estáticos PWA
│   ├── index.html
│   ├── manifest.json               # Configuración PWA
│   ├── robots.txt
│   └── service-worker.js           # Service Worker
├── src/
│   ├── components/
│   │   ├── ButtonPanel.jsx          # Componente de botones reutilizable
│   │   ├── ErrorMessage.jsx         # Componente de mensajes de error
│   │   └── screens/                 # Pantallas principales
│   │       ├── HomeScreen.jsx       # Pantalla inicial (navegación principal)
│   │       ├── CityCenterScreen.jsx # Paradas al centro
│   │       ├── FromMatheuScreen.jsx # Paradas desde Matheu
│   │       ├── LineSelectionScreen.jsx # Seleccionar línea
│   │       ├── LineScreen.jsx       # Detalles de una línea
│   │       ├── NearStopsScreen.jsx  # Paradas cercanas (geolocalización)
│   │       └── StopScreen.jsx       # Detalle de una parada
│   ├── constants/
│   │   ├── colorsByLine.js         # Mapeo de colores por línea de colectivo
│   │   └── endpoints.js            # URLs de la API
│   ├── hooks/
│   │   └── useColectivos.js        # Custom hook para fetching de datos
│   ├── App.js                       # Componente raíz con ruteo
│   ├── App.css                      # Estilos globales
│   ├── index.css                    # Estilos base
│   ├── index.js                     # Punto de entrada
│   └── setupTests.js
├── api/
│   ├── arribos.js                   # Endpoint: obtener llegadas de colectivos
│   └── paradas-cercanas.js          # Endpoint: obtener paradas cercanas
├── build/                           # Build compilado para producción
├── tailwind.config.js               # Configuración Tailwind
├── postcss.config.js                # Configuración PostCSS
├── vercel.json                      # Configuración Vercel
└── package.json

```

---

## 🚀 Configuración del Entorno

### Requisitos Previos
- Node.js 22.21.0 (ver `.nvmrc` o `package.json`)
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <repo-url>
cd colectivos-app

# Instalar dependencias
npm install
```

---

## 🎮 Cómo Ejecutar

### Desarrollo Local

```bash
# Con Vercel CLI (recomendado)
vercel dev

# O con React Scripts
npm start
```

La app estará disponible en `http://localhost:3000`

### Build para Producción

```bash
# Build local
npm run build

# Deploy a producción con Vercel
vercel --prod
```

### Testing

```bash
npm test
```

---

## 🗺️ Rutas Disponibles

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | HomeScreen | Pantalla inicial con opciones principales |
| `/centro/:parada` | CityCenterScreen | Horarios de colectivos al centro desde una parada |
| `/from-matheu` | FromMatheuScreen | Líneas de colectivos desde la zona de Matheu |
| `/casa` | LineSelectionScreen | Selector de línea para volver a casa |
| `/linea/:linea` | LineScreen | Detalles de una línea específica |
| `/paradas-cercanas` | NearStopsScreen | Paradas cercanas usando geolocalización |
| `/paradas/:id` | StopScreen | Detalle de una parada específica |

---

## 🔌 API Endpoints

Todos los endpoints están centralizados en [`src/constants/endpoints.js`](src/constants/endpoints.js):

```javascript
{
  centro: '/api/arribos?codLinea=0&idParada={idParada}',
  linea214: '/api/arribos?codLinea=169&idParada=LP2060',
  linea520: '/api/arribos?codLinea=284&idParada=LP2065',
  linea202: '/api/arribos?codLinea=130&idParada=LP2065',
  angiToCentro: '/api/arribos?codLinea=0&idParada=LP 1636',
  getNearStops: '/api/paradas-cercanas',
  getBusesByStop: '/api/arribos?codLinea={codLinea}&idParada={idParada}'
}
```

### Endpoints API

- **GET `/api/arribos`** - Obtiene los horarios de llegada de colectivos
  - Parámetros: `codLinea`, `idParada`
  
- **GET `/api/paradas-cercanas`** - Obtiene paradas cercanas a la ubicación del usuario
  - Requiere geolocalización habilitada

---

## ✨ Características Principales

### 1. **PWA (Progressive Web App)**
- Instalable en dispositivos móviles y desktop
- Funciona offline con Service Worker
- Notificaciones de actualizaciones disponibles
- Sin necesidad de App Store

### 2. **Geolocalización**
- Detección automática de paradas cercanas
- Usa la API de Geolocation del navegador
- Manejo seguro de permisos

### 3. **Sistema de Actualización**
```
Usuario abre app → SW verifica actualizaciones → Detecta nueva versión
→ Muestra notificación flotante verde → Usuario hace click en "Actualizar"
→ App se recarga con nueva versión ✅
```

### 4. **Custom Hooks**
- **`useColectivos`** - Manejo centralizado de fetching de datos, loading y errores

### 5. **Estilos Tailwind**
- Diseño responsivo
- Estilos optimizados para mobile first
- Colores por línea de colectivo

---

## 📌 Patrones y Convenciones

### Nombrado de Componentes
- Componentes funcionales con extensión `.jsx`
- Screens en `src/components/screens/`
- PascalCase para nombres de componentes

### Estructura de Estado
El hook `useColectivos` proporciona:
```javascript
{
  colectivos: [],      // Array de datos
  cargando: boolean,   // Estado de carga
  error: string|null,  // Mensaje de error
  obtenerColectivos()  // Función para fetchear
}
```

### Estilos
- Usar Tailwind CSS classes
- Colores personalizados en `src/constants/colorsByLine.js`
- Responsive design: mobile-first approach

---

## 🐛 TODO

- [ ] Sistema de notificaciones push
- [ ] Caché mejorado de datos
- [ ] Modo oscuro
- [ ] Múltiples idiomas
- [ ] Historial de búsquedas
- [ ] Favoritos de paradas

---

## 📱 Información de Versión

- **Versión Actual:** 3.1.2
- **Node:** 22.21.0
- **Última Actualización:** Mayo 2026

---

## 📝 Notas de Desarrollo

- Los endpoints están mapeados a líneas específicas de colectivos en La Paz
- El Service Worker maneja notificaciones de actualización automáticamente
- La app usa HashRouter para compatibilidad con Vercel
- Los datos se obtienen via fetch con manejo de errores centralizado

---

## 🤝 Contribuyendo

Al trabajar con Copilot en este proyecto:

1. Mantén la estructura de carpetas organizada
2. Usa componentes funcionales y hooks
3. Centraliza constantes en `src/constants/`
4. Maneja errores con el patrón de `useColectivos`
5. Documenta cambios en el archivo `.instructions.md`
