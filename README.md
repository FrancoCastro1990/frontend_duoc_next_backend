# Agencia de Viajes Oeste - Sistema de Solicitudes de Viaje

Actividad formativa Semana 5 - Desarrollo Frontend III (DuocUC).
Franco Castro Villanueva.

Sistema de registro y listado de solicitudes de viaje con **Next.js (SSR)** para el frontend y **Node.js + Express** como backend separado, utilizando datos mock almacenados en archivos JSON.

## Tecnologias

- **Frontend:** Next.js 16 (App Router), React, TypeScript, Tailwind CSS, react-hook-form
- **Backend:** Node.js, Express, CORS, almacenamiento en JSON con fs

## Requisitos previos

- Node.js >= 18
- npm

## Iniciar el proyecto

### 1. Backend (puerto 3001)

```bash
cd backend
npm install
npm start
```

El servidor se inicia en `http://localhost:3001`.

### 2. Frontend (puerto 3000)

```bash
cd frontend
npm install
npm run dev
```

La aplicacion se inicia en `http://localhost:3000`.

### 3. Acceder

Abrir [http://localhost:3000](http://localhost:3000) en el navegador. La pagina principal redirige automaticamente al listado de solicitudes.

## Funcionalidades

### Listado de solicitudes (SSR)

- Renderizado en el servidor (Server Component async con `fetch` y `cache: 'no-store'`)
- Muestra timestamp del servidor para demostrar el SSR
- Se puede verificar con View Source (Ctrl+U): el HTML viene pre-renderizado con los datos

### Filtrado por estado

- Botones de filtro: Todas, Pendiente, En Proceso, Finalizada
- Al filtrar, se navega a `/solicitudes?estado=X` y el Server Component re-renderiza con datos filtrados desde el backend

### Formulario de nueva solicitud

Campos del formulario:

| Campo | Tipo de control | Detalle |
|-------|----------------|---------|
| ID Solicitud | Texto (deshabilitado) | Se genera automaticamente en el backend (correlativo) |
| DNI | Input texto | Requerido |
| Nombre Cliente | Campo de busqueda | Autocompletado desde `/api/clientes` |
| Email Cliente | Input texto | Requerido, validacion de formato email |
| Origen | Input texto | Requerido |
| Destino | Input texto | Requerido |
| Tipo de Viaje | Select (listado) | Negocios, Turismo, Otros |
| Fecha y hora de salida | datetime-local | Requerido |
| Fecha y hora de regreso | datetime-local | Requerido |
| Fecha de registro | Texto (deshabilitado) | Se registra automaticamente en el backend |
| Estado | Radio buttons | Pendiente, En Proceso, Finalizada |

### Validacion

- **Frontend:** react-hook-form con validacion de campos requeridos y formato de email
- **Backend:** validacion duplicada en Express; retorna errores por campo que se muestran en el formulario

### Busqueda de clientes

- El campo "Nombre Cliente" es un autocompletado que consulta la API `/api/clientes`
- Al seleccionar un cliente, se auto-completan los campos DNI y Email

## Endpoints API

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | `/api/solicitudes` | Listar todas las solicitudes |
| GET | `/api/solicitudes?estado=pendiente` | Filtrar por estado (`pendiente`, `en proceso`, `finalizada`) |
| POST | `/api/solicitudes` | Crear nueva solicitud (valida campos vacios y email) |
| GET | `/api/clientes` | Lista de clientes mock para autocompletado |

## Estructura del proyecto

```
frontend_final_recursos/
├── backend/
│   ├── package.json
│   ├── servidor.js              # API Express (GET/POST solicitudes, GET clientes)
│   ├── README.md
│   └── data/
│       ├── solicitudes.json     # Solicitudes con ID auto-incremental
│       └── clientes.json        # 8 clientes chilenos mock
├── frontend/
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── README.md
│   └── src/
│       ├── app/
│       │   ├── layout.tsx           # Layout global con Navbar (Server Component)
│       │   ├── page.tsx             # Redirect a /solicitudes
│       │   ├── globals.css          # Estilos globales + Tailwind
│       │   └── solicitudes/
│       │       ├── page.tsx         # Listado SSR con filtros (Server Component)
│       │       └── nueva/
│       │           └── page.tsx     # Pagina del formulario
│       ├── components/
│       │   ├── Navbar.tsx           # Barra de navegacion
│       │   ├── SolicitudCard.tsx    # Tarjeta de solicitud (Server Component)
│       │   ├── FilterBar.tsx        # Filtro por estado ('use client')
│       │   ├── SolicitudForm.tsx    # Formulario con react-hook-form ('use client')
│       │   └── ClienteSearch.tsx    # Autocompletado de clientes ('use client')
│       ├── types/
│       │   └── solicitud.types.ts   # Interfaces y tipos TypeScript
│       └── services/
│           └── solicitudService.ts  # Funciones de fetch a la API
└── README.md                        # Este archivo
```

## Server Components vs Client Components

| Componente | Tipo | Razon |
|------------|------|-------|
| `layout.tsx` | Server | No requiere interactividad |
| `solicitudes/page.tsx` | Server (async) | Fetch SSR en el servidor |
| `SolicitudCard` | Server | Solo renderiza datos |
| `Navbar` | Server | Solo renderiza links |
| `FilterBar` | Client (`'use client'`) | Usa `useRouter` para navegacion |
| `SolicitudForm` | Client (`'use client'`) | Usa react-hook-form y estado |
| `ClienteSearch` | Client (`'use client'`) | Usa `useState`, `useEffect`, fetch en cliente |
