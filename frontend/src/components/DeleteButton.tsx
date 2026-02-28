'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function DeleteButton({ solicitudId }: { solicitudId: number }) {
  const router = useRouter();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleDelete() {
    if (!window.confirm(t('delete.confirm', { id: solicitudId }))) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`http://localhost:3001/api/solicitudes/${solicitudId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const json = await res.json();
        setError(json.error || t('delete.errorDelete'));
        return;
      }

      router.refresh();
    } catch {
      setError(t('delete.connectionError'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="px-3 py-1 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors disabled:opacity-50"
      >
        {loading ? t('delete.deleting') : t('delete.delete')}
      </button>
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}
