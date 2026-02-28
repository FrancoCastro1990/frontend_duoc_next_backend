'use client';

import { useTranslation } from 'react-i18next';

export default function SolicitudesEmpty({ hasFilter }: { hasFilter: boolean }) {
  const { t } = useTranslation();

  return (
    <div className="text-center py-12 text-gray-500">
      <p className="text-lg">{t('solicitudes.noFound')}</p>
      {hasFilter && <p className="text-sm mt-1">{t('solicitudes.noFoundHint')}</p>}
    </div>
  );
}
