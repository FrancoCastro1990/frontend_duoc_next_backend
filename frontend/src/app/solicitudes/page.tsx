import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import SolicitudesList from '@/components/SolicitudesList';
import SolicitudesSkeleton from '@/components/SolicitudesSkeleton';
import SolicitudesHeader from '@/components/SolicitudesHeader';

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

  return (
    <div>
      <SolicitudesHeader />

      <div className="mb-6">
        <FilterBar />
      </div>

      <Suspense fallback={<SolicitudesSkeleton />}>
        <SolicitudesList estado={estado} />
      </Suspense>
    </div>
  );
}
