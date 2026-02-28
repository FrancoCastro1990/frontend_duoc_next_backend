'use client';

import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { Solicitud } from '@/types/solicitud.types';

const ClientSolicitudCard = dynamic(() => import('./ClientSolicitudCard'), {
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

export default function ClientSolicitudesList({ solicitudes }: { solicitudes: Solicitud[] }) {
  const { t } = useTranslation();

  if (solicitudes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">{t('client.noFound')}</p>
        <p className="text-sm mt-1">{t('client.noFoundHint')}</p>
      </div>
    );
  }

  return (
    <>
      <p className="text-sm text-gray-600 mb-4">
        {t('client.results', { count: solicitudes.length })}
      </p>
      <div className="grid gap-4">
        {solicitudes.map((s) => (
          <ClientSolicitudCard key={s.id} solicitud={s} />
        ))}
      </div>
    </>
  );
}
