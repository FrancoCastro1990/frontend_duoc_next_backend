'use client';

import { useTranslation } from 'react-i18next';
import { Solicitud } from '@/types/solicitud.types';
import DeleteButton from './DeleteButton';

const estadoBadge: Record<string, string> = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  'en proceso': 'bg-blue-100 text-blue-800',
  finalizada: 'bg-green-100 text-green-800',
};

export default function SolicitudCard({ solicitud }: { solicitud: Solicitud }) {
  const { t, i18n } = useTranslation();

  const tipoLabel: Record<string, string> = {
    negocios: t('card.tipoNegocios'),
    turismo: t('card.tipoTurismo'),
    otros: t('card.tipoOtros'),
  };

  const estadoLabel: Record<string, string> = {
    pendiente: t('filter.pendiente'),
    'en proceso': t('filter.enProceso'),
    finalizada: t('filter.finalizada'),
  };

  function formatDate(dateStr: string) {
    const locale = i18n.language === 'en' ? 'en-US' : 'es-CL';
    return new Date(dateStr).toLocaleString(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            #{solicitud.id} - {solicitud.nombreCliente}
          </h3>
          <p className="text-sm text-gray-500">{t('card.dni')}: {solicitud.dni}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${estadoBadge[solicitud.estado]}`}
        >
          {estadoLabel[solicitud.estado]}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mb-3">
        <div>
          <span className="font-medium">{t('card.origen')}:</span> {solicitud.origen}
        </div>
        <div>
          <span className="font-medium">{t('card.destino')}:</span> {solicitud.destino}
        </div>
        <div>
          <span className="font-medium">{t('card.salida')}:</span>{' '}
          {formatDate(solicitud.fechaSalida)}
        </div>
        <div>
          <span className="font-medium">{t('card.regreso')}:</span>{' '}
          {formatDate(solicitud.fechaRegreso)}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-3">
        <span className="text-gray-500">
          {t('card.tipo')}: <span className="font-medium">{tipoLabel[solicitud.tipoViaje]}</span>
        </span>
        <span className="text-gray-500">
          {t('card.email')}: {solicitud.emailCliente}
        </span>
      </div>

      <p className="text-xs text-gray-400 mt-2">
        {t('card.registrado')}: {formatDate(solicitud.fechaRegistro)}
      </p>

      <div className="mt-3 flex justify-end">
        <DeleteButton solicitudId={solicitud.id} />
      </div>
    </div>
  );
}
