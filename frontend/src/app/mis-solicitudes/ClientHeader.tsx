'use client';

import { useTranslation } from 'react-i18next';

export default function ClientHeader() {
  const { t } = useTranslation();

  return (
    <h1 className="text-2xl font-bold text-gray-900 mb-6">{t('client.title')}</h1>
  );
}
