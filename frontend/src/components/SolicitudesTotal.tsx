'use client';

import { useTranslation } from 'react-i18next';

export default function SolicitudesTotal({ count }: { count: number }) {
  const { t } = useTranslation();

  return (
    <p className="text-xs text-gray-400 mt-8 text-center">
      {t('solicitudes.total', { count })}
    </p>
  );
}
