import dynamic from 'next/dynamic';
import { Solicitud } from '@/types/solicitud.types';

const SolicitudCard = dynamic(() => import('./SolicitudCard'), {
  loading: () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 animate-pulse">
      <div className="h-5 w-48 bg-gray-200 rounded mb-3" />
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="h-4 w-36 bg-gray-200 rounded" />
        <div className="h-4 w-36 bg-gray-200 rounded" />
      </div>
    </div>
  ),
});

async function fetchSolicitudes(estado?: string): Promise<Solicitud[]> {
  const params = estado ? `?estado=${encodeURIComponent(estado)}` : '';
  const res = await fetch(`http://localhost:3001/api/solicitudes${params}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Error al obtener solicitudes');
  return res.json();
}

interface SolicitudesListProps {
  estado?: string;
}

export default async function SolicitudesList({ estado }: SolicitudesListProps) {
  await new Promise((r) => setTimeout(r, 3000));

  const solicitudes = await fetchSolicitudes(estado);

  if (solicitudes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No se encontraron solicitudes</p>
        {estado && <p className="text-sm mt-1">Prueba quitando el filtro de estado</p>}
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4">
        {solicitudes.map((s) => (
          <SolicitudCard key={s.id} solicitud={s} />
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-8 text-center">
        Total: {solicitudes.length} solicitud{solicitudes.length !== 1 ? 'es' : ''}
      </p>
    </>
  );
}
