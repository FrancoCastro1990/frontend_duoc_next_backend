'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const estados = [
  { value: '', label: 'Todas' },
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'en proceso', label: 'En Proceso' },
  { value: 'finalizada', label: 'Finalizada' },
];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get('estado') || '';

  function handleFilter(estado: string) {
    if (estado) {
      router.push(`/solicitudes?estado=${encodeURIComponent(estado)}`);
    } else {
      router.push('/solicitudes');
    }
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {estados.map((e) => (
        <button
          key={e.value}
          onClick={() => handleFilter(e.value)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            current === e.value
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {e.label}
        </button>
      ))}
    </div>
  );
}
