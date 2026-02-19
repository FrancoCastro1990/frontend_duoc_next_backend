import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import SolicitudesList from '@/components/SolicitudesList';
import SolicitudesSkeleton from '@/components/SolicitudesSkeleton';

const FilterBar = dynamic(() => import('@/components/FilterBar'), {
  loading: () => (
    <div className="flex gap-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-10 w-24 bg-gray-200 rounded-md animate-pulse" />
      ))}
    </div>
  ),
});

interface PageProps {
  searchParams: Promise<{ estado?: string }>;
}

export default async function SolicitudesPage({ searchParams }: PageProps) {
  const { estado } = await searchParams;
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
        <FilterBar />
      </div>

      <Suspense fallback={<SolicitudesSkeleton />}>
        <SolicitudesList estado={estado} />
      </Suspense>
    </div>
  );
}
