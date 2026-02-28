'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

interface SearchFormData {
  dni: string;
}

export default function ClientSearchForm() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>();

  function onSubmit(data: SearchFormData) {
    router.push(`/mis-solicitudes?dni=${encodeURIComponent(data.dni.trim())}`);
  }

  return (
    <form key={i18n.language} onSubmit={handleSubmit(onSubmit)} className="flex gap-3 items-start">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('client.dniLabel')}
        </label>
        <input
          type="text"
          {...register('dni', {
            required: t('validation.dniRequired'),
            pattern: {
              value: /^\d{1,2}\.?\d{3}\.?\d{3}-[\dkK]$/,
              message: t('validation.dniFormat'),
            },
          })}
          placeholder={t('client.dniPlaceholder')}
          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
            errors.dni ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.dni && (
          <p className="text-red-600 text-sm mt-1">{errors.dni.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
      >
        {t('client.search')}
      </button>
    </form>
  );
}
