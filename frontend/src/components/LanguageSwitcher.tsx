'use client';

import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  function toggle() {
    const next = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(next);
  }

  return (
    <button
      onClick={toggle}
      className="px-3 py-1 text-sm font-semibold border border-white/30 rounded hover:bg-blue-700 transition-colors"
    >
      {t('lang.switchTo')}
    </button>
  );
}
