'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get('estado') || '';
  const { t } = useTranslation();

  const estados = [
    { value: '', label: t('filter.all') },
    { value: 'pendiente', label: t('filter.pendiente') },
    { value: 'en proceso', label: t('filter.enProceso') },
    { value: 'finalizada', label: t('filter.finalizada') },
  ];

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
