# Agencia de Viajes Oeste - Sistema de Solicitudes de Viaje

Actividad formativa Semana 5/7/8 - Desarrollo Frontend III (DuocUC).
Franco Castro Villanueva.

Sistema de registro y listado de solicitudes de viaje con **Next.js (SSR)** para el frontend y **Node.js + Express** como backend separado, utilizando datos mock almacenados en archivos JSON. Incluye vista de agente (CRUD completo) y vista de cliente (consulta por DNI, solo lectura).

## Tecnologias

- **Frontend:** Next.js 16 (App Router), React, TypeScript, Tailwind CSS, react-hook-form, react-i18next
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

- **Frontend (formulario nueva solicitud):** react-hook-form con validacion de campos requeridos, formato de email y formato de RUT
- **Frontend (busqueda cliente):** react-hook-form con validacion de formato RUT chileno e i18n
- **Backend:** validacion duplicada en Express; retorna errores por campo que se muestran en el formulario

### Busqueda de clientes

- El campo "Nombre Cliente" es un autocompletado que consulta la API `/api/clientes`
- Al seleccionar un cliente, se auto-completan los campos DNI y Email

### Internacionalizacion (i18n)

- Soporte para **Español (ES)** e **Ingles (EN)** usando `react-i18next`
- Boton de cambio de idioma en el Navbar (toggle ES/EN)
- Persistencia del idioma seleccionado en `localStorage`
- Traducciones bundleadas como JSON (sin fetch HTTP adicional)
- Todos los textos de la UI estan localizados: labels, placeholders, botones, filtros, estados, tipos de viaje
- **Validaciones i18n:** los mensajes de error del formulario se muestran en el idioma activo. Al cambiar idioma, el formulario se re-monta (`key={i18n.language}`) para re-registrar las validaciones con los nuevos strings
- **Contenido i18n diferido:** el formulario (`SolicitudForm`) se carga con `next/dynamic` y `ssr: false`, cumpliendo con contenido i18n cargado de forma diferida
- Fechas formateadas con locale dinamico (`es-CL` / `en-US`) segun idioma activo

### Lazy loading y Skeleton loaders

- Componentes cargados de forma diferida con `next/dynamic`: FilterBar, SolicitudCard, SolicitudForm, ClienteSearch, ClientSearchForm, ClientSolicitudCard
- Skeleton loaders animados mientras los componentes cargan
- `SolicitudesSkeleton` para el listado completo durante el fetch SSR (via `<Suspense>`) — usado tanto en vista agente como vista cliente

### Vista de cliente - Consulta de solicitudes por DNI (Semana 8)

- Pagina `/mis-solicitudes` donde el cliente puede consultar sus solicitudes ingresando su DNI
- Formulario de busqueda con **react-hook-form**: validacion de formato RUT chileno (`/^\d{1,2}\.?\d{3}\.?\d{3}-[\dkK]$/`) con mensajes i18n
- Al buscar, se navega a `/mis-solicitudes?dni=X` y el Server Component fetch las solicitudes filtradas desde el backend
- Tarjetas de solicitud en **solo lectura** (sin boton Eliminar)
- Maneja estado vacio con mensaje i18n ("No se encontraron solicitudes para este DNI")
- Muestra contador de resultados ("Solicitudes encontradas: N")
- `ClientSearchForm` cargado con `next/dynamic` + skeleton loader
- `ClientSolicitudCard` cargado con `next/dynamic` + skeleton loader
- Resultados envueltos en `<Suspense>` con `SolicitudesSkeleton` como fallback

### Eliminacion de solicitudes

- Boton "Eliminar" en cada tarjeta de solicitud (solo en vista de agente)
- Dialogo de confirmacion traducido segun idioma activo
- Llama a `DELETE /api/solicitudes/:id` y refresca la lista

## Endpoints API

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | `/api/solicitudes` | Listar todas las solicitudes |
| GET | `/api/solicitudes?estado=pendiente` | Filtrar por estado (`pendiente`, `en proceso`, `finalizada`) |
| GET | `/api/solicitudes?dni=16414595-0` | Filtrar por DNI del cliente (case-insensitive, ignora puntos) |
| POST | `/api/solicitudes` | Crear nueva solicitud (valida campos vacios y email) |
| DELETE | `/api/solicitudes/:id` | Eliminar solicitud por ID |
| GET | `/api/clientes` | Lista de clientes mock para autocompletado |

## Estructura del proyecto

```
frontend_duoc_next_backend/
├── backend/
│   ├── package.json
│   ├── servidor.js              # API Express (CRUD solicitudes, GET clientes)
│   ├── README.md
│   └── data/
│       ├── solicitudes.json     # Solicitudes con ID auto-incremental
│       └── clientes.json        # 8 clientes chilenos mock
├── frontend/
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── public/
│   │   └── locales/
│   │       ├── es/common.json   # Traducciones español
│   │       └── en/common.json   # Traducciones ingles
│   └── src/
│       ├── lib/
│       │   └── i18n.ts              # Configuracion i18next
│       ├── app/
│       │   ├── layout.tsx           # Layout global con I18nProvider
│       │   ├── page.tsx             # Redirect a /solicitudes
│       │   ├── globals.css          # Estilos globales + Tailwind
│       │   ├── solicitudes/
│       │   │   ├── page.tsx         # Listado SSR con filtros (Server Component)
│       │   │   └── nueva/
│       │   │       └── page.tsx     # Formulario (Client, dynamic ssr:false)
│       │   └── mis-solicitudes/
│       │       ├── page.tsx         # Vista cliente SSR (Server Component + Suspense)
│       │       └── ClientHeader.tsx # Titulo i18n de la vista cliente
│       ├── components/
│       │   ├── Navbar.tsx           # Barra de navegacion + LanguageSwitcher
│       │   ├── I18nProvider.tsx     # Provider i18next ('use client')
│       │   ├── HtmlLangSync.tsx     # Sync <html lang> con idioma activo
│       │   ├── LanguageSwitcher.tsx  # Boton toggle ES/EN
│       │   ├── SolicitudesHeader.tsx # Titulo + timestamp traducible
│       │   ├── SolicitudesList.tsx   # Lista async (Server Component)
│       │   ├── SolicitudesEmpty.tsx  # Estado vacio traducible
│       │   ├── SolicitudesTotal.tsx  # Total traducible
│       │   ├── SolicitudesSkeleton.tsx # Skeleton loader
│       │   ├── SolicitudCard.tsx    # Tarjeta de solicitud ('use client')
│       │   ├── FilterBar.tsx        # Filtro por estado ('use client')
│       │   ├── SolicitudForm.tsx    # Formulario con react-hook-form + i18n
│       │   ├── DeleteButton.tsx     # Boton eliminar con confirm i18n
│       │   ├── ClienteSearch.tsx    # Autocompletado de clientes ('use client')
│       │   ├── ClientSearchForm.tsx # Busqueda por DNI con RHF + validacion i18n
│       │   ├── ClientSolicitudCard.tsx # Tarjeta solo lectura (sin eliminar)
│       │   └── ClientSolicitudesList.tsx # Lista de resultados filtrados por DNI
│       └── types/
│           └── solicitud.types.ts   # Interfaces y tipos TypeScript
└── README.md                        # Este archivo
```

## Server Components vs Client Components

| Componente | Tipo | Razon |
|------------|------|-------|
| `layout.tsx` | Server | No requiere interactividad |
| `solicitudes/page.tsx` | Server (async) | Fetch SSR en el servidor |
| `SolicitudesList` | Server (async) | Fetch SSR, delega texto a sub-componentes Client |
| `Navbar` | Client (`'use client'`) | Usa `useTranslation` para i18n |
| `SolicitudCard` | Client (`'use client'`) | Usa `useTranslation` para labels y fechas localizadas |
| `FilterBar` | Client (`'use client'`) | Usa `useRouter` + `useTranslation` |
| `SolicitudForm` | Client (`'use client'`) | react-hook-form + validaciones i18n |
| `DeleteButton` | Client (`'use client'`) | Usa confirm dialog traducido |
| `ClienteSearch` | Client (`'use client'`) | `useState`, `useEffect`, placeholder i18n |
| `SolicitudesHeader` | Client (`'use client'`) | Titulo y timestamp con locale dinamico |
| `SolicitudesEmpty` | Client (`'use client'`) | Mensaje vacio traducible |
| `SolicitudesTotal` | Client (`'use client'`) | Total con pluralizacion i18n |
| `I18nProvider` | Client (`'use client'`) | Envuelve la app con `I18nextProvider` |
| `HtmlLangSync` | Client (`'use client'`) | Sincroniza `<html lang>` |
| `LanguageSwitcher` | Client (`'use client'`) | Toggle ES/EN |
| `mis-solicitudes/page.tsx` | Server (async) | Fetch SSR por DNI con Suspense |
| `ClientHeader` | Client (`'use client'`) | Titulo traducible vista cliente |
| `ClientSearchForm` | Client (`'use client'`) | react-hook-form + validacion RUT i18n |
| `ClientSolicitudCard` | Client (`'use client'`) | Tarjeta solo lectura con i18n |
| `ClientSolicitudesList` | Client (`'use client'`) | Renderiza cards o estado vacio con i18n |
