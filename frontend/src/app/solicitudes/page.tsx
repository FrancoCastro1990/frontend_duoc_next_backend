import { Solicitud } from '@/types/solicitud.types';
import SolicitudCard from '@/components/SolicitudCard';
import FilterBar from '@/components/FilterBar';
import { Suspense } from 'react';

async function fetchSolicitudes(estado?: string): Promise<Solicitud[]> {
  const params = estado ? `?estado=${encodeURIComponent(estado)}` : '';
  const res = await fetch(`http://localhost:3001/api/solicitudes${params}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Error al obtener solicitudes');
  return res.json();
}

interface PageProps {
  searchParams: Promise<{ estado?: string }>;
}

export default async function SolicitudesPage({ searchParams }: PageProps) {
  const { estado } = await searchParams;
  const solicitudes = await fetchSolicitudes(estado);
  const serverTime = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Solicitudes de Viaje</h1>
        <p className="text-sm text-gray-500">
          Renderizado en servidor: {serverTime}
        </p>
      </div>

      <div className="mb-6">
        <Suspense fallback={null}>
          <FilterBar />
        </Suspense>
      </div>

      {solicitudes.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No se encontraron solicitudes</p>
          {estado && <p className="text-sm mt-1">Prueba quitando el filtro de estado</p>}
        </div>
      ) : (
        <div className="grid gap-4">
          {solicitudes.map((s) => (
            <SolicitudCard key={s.id} solicitud={s} />
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400 mt-8 text-center">
        Total: {solicitudes.length} solicitud{solicitudes.length !== 1 ? 'es' : ''}
      </p>
    </div>
  );
}
