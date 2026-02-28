'use client';

import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

const SolicitudForm = dynamic(() => import('@/components/SolicitudForm'), {
  ssr: false,
  loading: () => (
    <div className="space-y-5 animate-pulse">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <div key={i}>
          <div className="h-4 w-28 bg-gray-200 rounded mb-2" />
          <div className="h-10 w-full bg-gray-200 rounded-md" />
        </div>
      ))}
      <div className="h-12 w-full bg-gray-300 rounded-md" />
    </div>
  ),
});

export default function NuevaSolicitudPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t('nueva.title')}</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <SolicitudForm />
      </div>
    </div>
  );
}
