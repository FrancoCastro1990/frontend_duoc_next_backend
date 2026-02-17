const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const SOLICITUDES_FILE = path.join(__dirname, 'data', 'solicitudes.json');
const CLIENTES_FILE = path.join(__dirname, 'data', 'clientes.json');

// Middleware
app.use(cors());
app.use(express.json());

// Funciones auxiliares para leer/escribir JSON
function readSolicitudes() {
  const data = fs.readFileSync(SOLICITUDES_FILE, 'utf8');
  return JSON.parse(data);
}

function writeSolicitudes(data) {
  fs.writeFileSync(SOLICITUDES_FILE, JSON.stringify(data, null, 2));
}

function readClientes() {
  const data = fs.readFileSync(CLIENTES_FILE, 'utf8');
  return JSON.parse(data);
}

// Validacion de solicitud
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TIPOS_VIAJE = ['negocios', 'turismo', 'otros'];
const ESTADOS = ['pendiente', 'en proceso', 'finalizada'];

function validateSolicitud(body) {
  const fields = {};

  const requiredText = [
    ['dni', 'DNI'],
    ['nombreCliente', 'Nombre del cliente'],
    ['emailCliente', 'Email del cliente'],
    ['origen', 'Origen'],
    ['destino', 'Destino'],
    ['fechaSalida', 'Fecha de salida'],
    ['fechaRegreso', 'Fecha de regreso'],
  ];

  for (const [key, label] of requiredText) {
    if (!body[key] || String(body[key]).trim() === '') {
      fields[key] = `${label} es requerido`;
    }
  }

  if (body.emailCliente && !EMAIL_REGEX.test(body.emailCliente.trim())) {
    fields.emailCliente = 'Formato de email inválido';
  }

  if (!body.tipoViaje || !TIPOS_VIAJE.includes(body.tipoViaje)) {
    fields.tipoViaje = 'Tipo de viaje debe ser: negocios, turismo u otros';
  }

  if (!body.estado || !ESTADOS.includes(body.estado)) {
    fields.estado = 'Estado debe ser: pendiente, en proceso o finalizada';
  }

  return Object.keys(fields).length > 0 ? fields : null;
}

// GET /api/solicitudes - Listar solicitudes con filtro opcional por estado
app.get('/api/solicitudes', (req, res) => {
  try {
    const data = readSolicitudes();
    let solicitudes = data.solicitudes;

    const { estado } = req.query;
    if (estado && ESTADOS.includes(estado)) {
      solicitudes = solicitudes.filter(s => s.estado === estado);
    }

    res.json(solicitudes);
  } catch (error) {
    console.error('Error al leer solicitudes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/solicitudes - Crear nueva solicitud
app.post('/api/solicitudes', (req, res) => {
  try {
    const errors = validateSolicitud(req.body);
    if (errors) {
      return res.status(400).json({ error: 'Datos inválidos', fields: errors });
    }

    const data = readSolicitudes();

    const nuevaSolicitud = {
      id: data.nextId,
      dni: req.body.dni.trim(),
      nombreCliente: req.body.nombreCliente.trim(),
      emailCliente: req.body.emailCliente.trim(),
      origen: req.body.origen.trim(),
      destino: req.body.destino.trim(),
      tipoViaje: req.body.tipoViaje,
      fechaSalida: req.body.fechaSalida,
      fechaRegreso: req.body.fechaRegreso,
      fechaRegistro: new Date().toISOString(),
      estado: req.body.estado,
    };

    data.solicitudes.push(nuevaSolicitud);
    data.nextId += 1;
    writeSolicitudes(data);

    res.status(201).json(nuevaSolicitud);
  } catch (error) {
    console.error('Error al crear solicitud:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /api/clientes - Lista de clientes mock
app.get('/api/clientes', (req, res) => {
  try {
    const data = readClientes();
    res.json(data.clientes);
  } catch (error) {
    console.error('Error al leer clientes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
