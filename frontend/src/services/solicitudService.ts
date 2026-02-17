const API_URL = 'http://localhost:3001/api';

export async function getSolicitudes(estado?: string) {
  const params = estado ? `?estado=${encodeURIComponent(estado)}` : '';
  const res = await fetch(`${API_URL}/solicitudes${params}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Error al obtener solicitudes');
  return res.json();
}

export async function createSolicitud(data: Record<string, string>) {
  const res = await fetch(`${API_URL}/solicitudes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw json;
  return json;
}

export async function getClientes() {
  const res = await fetch(`${API_URL}/clientes`);
  if (!res.ok) throw new Error('Error al obtener clientes');
  return res.json();
}
