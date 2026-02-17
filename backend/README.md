# Backend - Agencia de Viajes Oeste

API REST con Node.js y Express para gestionar solicitudes de viaje. Almacenamiento en archivos JSON (mock).

## Requisitos

- Node.js >= 18

## Instalación y ejecución

```bash
npm install
npm start
```

El servidor se inicia en `http://localhost:3001`.

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/solicitudes` | Listar todas las solicitudes |
| GET | `/api/solicitudes?estado=pendiente` | Filtrar por estado (`pendiente`, `en proceso`, `finalizada`) |
| POST | `/api/solicitudes` | Crear nueva solicitud |
| GET | `/api/clientes` | Listar clientes mock para autocompletado |

## Crear solicitud (POST)

```json
{
  "dni": "19234567-8",
  "nombreCliente": "Valentina Soto",
  "emailCliente": "valentina.soto@email.cl",
  "origen": "Santiago, Chile",
  "destino": "Lima, Perú",
  "tipoViaje": "turismo",
  "fechaSalida": "2026-05-01T09:00",
  "fechaRegreso": "2026-05-10T18:00",
  "estado": "pendiente"
}
```

Los campos `id`, `fechaRegistro` se generan automáticamente en el servidor.

## Validaciones

- Campos requeridos: `dni`, `nombreCliente`, `emailCliente`, `origen`, `destino`, `fechaSalida`, `fechaRegreso`
- Email: formato válido (regex)
- `tipoViaje`: `negocios` | `turismo` | `otros`
- `estado`: `pendiente` | `en proceso` | `finalizada`

Respuesta de error (400):

```json
{
  "error": "Datos inválidos",
  "fields": {
    "emailCliente": "Formato de email inválido",
    "destino": "Destino es requerido"
  }
}
```

## Almacenamiento

- `data/solicitudes.json` - Solicitudes con ID auto-incremental (`nextId`)
- `data/clientes.json` - 8 clientes chilenos de ejemplo

## Tecnologías

- Express 4
- CORS
- fs (lectura/escritura de JSON)
