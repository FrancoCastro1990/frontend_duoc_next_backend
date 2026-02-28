import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Solicitud } from '@/types/solicitud.types';
import ClientSolicitudesList from '@/components/ClientSolicitudesList';
import SolicitudesSkeleton from '@/components/SolicitudesSkeleton';
import ClientHeader from './ClientHeader';

const ClientSearchForm = dynamic(() => import('@/components/ClientSearchForm'), {
  loading: () => (
    <div className="flex gap-3 items-start animate-pulse">
      <div className="flex-1">
        <div className="h-4 w-28 bg-gray-200 rounded mb-2" />
        <div className="h-10 w-full bg-gray-200 rounded-md" />
      </div>
      <div className="mt-6 h-10 w-24 bg-gray-300 rounded-md" />
    </div>
  ),
});

async function fetchSolicitudesByDni(dni: string): Promise<Solicitud[]> {
  const res = await fetch(
    `http://localhost:3001/api/solicitudes?dni=${encodeURIComponent(dni)}`,
    { cache: 'no-store' }
  );
  if (!res.ok) throw new Error('Error al obtener solicitudes');
  return res.json();
}

async function SolicitudesResultados({ dni }: { dni: string }) {
  const solicitudes = await fetchSolicitudesByDni(dni);
  return <ClientSolicitudesList solicitudes={solicitudes} />;
}

interface PageProps {
  searchParams: Promise<{ dni?: string }>;
}

export default async function MisSolicitudesPage({ searchParams }: PageProps) {
  const { dni } = await searchParams;

  return (
    <div className="max-w-4xl mx-auto">
      <ClientHeader />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <ClientSearchForm />
      </div>

      {dni && (
        <Suspense fallback={<SolicitudesSkeleton />}>
          <SolicitudesResultados dni={dni} />
        </Suspense>
      )}
    </div>
  );
}
