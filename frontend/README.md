# Frontend - Agencia de Viajes Oeste

Aplicación Next.js con App Router, TypeScript y Tailwind CSS para gestionar solicitudes de viaje. Utiliza Server-Side Rendering (SSR) para el listado de solicitudes.

## Requisitos

- Node.js >= 18
- Backend corriendo en `http://localhost:3001`

## Instalación y ejecución

```bash
npm install
npm run dev
```

La aplicación se inicia en `http://localhost:3000`.

## Páginas

| Ruta | Tipo | Descripción |
|------|------|-------------|
| `/` | Server Component | Redirect a `/solicitudes` |
| `/solicitudes` | Server Component (SSR) | Listado de solicitudes con filtro por estado |
| `/solicitudes/nueva` | Client Component | Formulario para crear nueva solicitud |

## SSR (Server-Side Rendering)

La página `/solicitudes` es un **Server Component async** que hace `fetch` al backend en el servidor con `cache: 'no-store'`. Esto se puede verificar:

1. El timestamp "Renderizado en servidor" cambia en cada recarga
2. View Source (Ctrl+U) muestra el HTML completo pre-renderizado con los datos

## Componentes

| Componente | Tipo | Descripción |
|------------|------|-------------|
| `Navbar` | Server | Barra de navegación |
| `SolicitudCard` | Server | Tarjeta con datos de una solicitud |
| `FilterBar` | Client (`'use client'`) | Botones de filtro por estado, usa `useRouter` |
| `SolicitudForm` | Client (`'use client'`) | Formulario con react-hook-form y validación |
| `ClienteSearch` | Client (`'use client'`) | Autocompletado de clientes desde la API |

## Validación del formulario

- **Frontend** (react-hook-form): campos requeridos + formato de email
- **Backend**: validación duplicada, errores por campo mostrados en el formulario

## Estructura

```
src/
├── app/
│   ├── layout.tsx              # Layout global + Navbar
│   ├── page.tsx                # Redirect a /solicitudes
│   ├── globals.css             # Estilos globales + Tailwind
│   └── solicitudes/
│       ├── page.tsx            # Listado SSR con filtros
│       └── nueva/
│           └── page.tsx        # Formulario nueva solicitud
├── components/
│   ├── Navbar.tsx
│   ├── SolicitudCard.tsx
│   ├── FilterBar.tsx
│   ├── SolicitudForm.tsx
│   └── ClienteSearch.tsx
├── types/
│   └── solicitud.types.ts      # Interfaces y tipos
└── services/
    └── solicitudService.ts     # Funciones de fetch a la API
```

## Tecnologías

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- react-hook-form
