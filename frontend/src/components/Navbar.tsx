'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/solicitudes" className="text-xl font-bold">
          {t('nav.brand')}
        </Link>
        <div className="flex gap-4 items-center">
          <Link
            href="/solicitudes"
            className="hover:bg-blue-700 px-3 py-2 rounded transition-colors"
          >
            {t('nav.solicitudes')}
          </Link>
          <Link
            href="/mis-solicitudes"
            className="hover:bg-blue-700 px-3 py-2 rounded transition-colors"
          >
            {t('nav.misSolicitudes')}
          </Link>
          <Link
            href="/solicitudes/nueva"
            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition-colors"
          >
            {t('nav.nuevaSolicitud')}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
