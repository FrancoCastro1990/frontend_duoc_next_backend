'use client';

import { useTranslation } from 'react-i18next';

export default function SolicitudesHeader() {
  const { t, i18n } = useTranslation();

  const locale = i18n.language === 'en' ? 'en-US' : 'es-CL';
  const time = new Date().toLocaleString(locale, { timeZone: 'America/Santiago' });

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-900">{t('solicitudes.title')}</h1>
      <p className="text-sm text-gray-500">
        {t('solicitudes.serverRendered')}: {time}
      </p>
    </div>
  );
}
