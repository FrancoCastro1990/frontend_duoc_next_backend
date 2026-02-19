'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SolicitudFormData } from '@/types/solicitud.types';
import dynamic from 'next/dynamic';

const ClienteSearch = dynamic(() => import('./ClienteSearch'), {
  ssr: false,
  loading: () => (
    <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse" />
  ),
});

export default function SolicitudForm() {
  const router = useRouter();
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SolicitudFormData>({
    defaultValues: {
      tipoViaje: 'turismo',
      estado: 'pendiente',
    },
  });

  const nombreCliente = watch('nombreCliente') || '';

  async function onSubmit(data: SolicitudFormData) {
    setSubmitting(true);
    setServerErrors({});

    try {
      const res = await fetch('http://localhost:3001/api/solicitudes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        if (json.fields) {
          setServerErrors(json.fields);
        }
        return;
      }

      router.push('/solicitudes');
    } catch {
      setServerErrors({ general: 'Error de conexión con el servidor' });
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = (field: string) =>
    `w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
      errors[field as keyof SolicitudFormData] || serverErrors[field]
        ? 'border-red-500'
        : 'border-gray-300'
    }`;

  function fieldError(field: string) {
    const clientErr = errors[field as keyof SolicitudFormData]?.message;
    const serverErr = serverErrors[field];
    const msg = clientErr || serverErr;
    return msg ? <p className="text-red-600 text-sm mt-1">{msg}</p> : null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {serverErrors.general && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {serverErrors.general}
        </div>
      )}

      {/* ID Solicitud */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ID Solicitud
        </label>
        <input
          type="text"
          disabled
          value="Se generará automáticamente"
          className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-500"
        />
      </div>

      {/* DNI */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          DNI
        </label>
        <input
          type="text"
          {...register('dni', {
            required: 'DNI es requerido',
            pattern: {
              value: /^\d{1,2}\.?\d{3}\.?\d{3}-[\dkK]$/,
              message: 'Formato de RUT inválido (ej: 12.345.678-9)',
            },
          })}
          placeholder="Ej: 16414595-0"
          className={inputClass('dni')}
        />
        {fieldError('dni')}
      </div>

      {/* Nombre Cliente */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre Cliente
        </label>
        <input type="hidden" {...register('nombreCliente', { required: 'Nombre del cliente es requerido' })} />
        <ClienteSearch
          value={nombreCliente}
          onChange={(nombre, cliente) => {
            setValue('nombreCliente', nombre, { shouldValidate: true });
            if (cliente) {
              setValue('dni', cliente.dni, { shouldValidate: true });
              setValue('emailCliente', cliente.email, { shouldValidate: true });
            }
          }}
          error={errors.nombreCliente?.message || serverErrors.nombreCliente}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Cliente
        </label>
        <input
          type="text"
          {...register('emailCliente', {
            required: 'Email es requerido',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Formato de email inválido',
            },
          })}
          placeholder="correo@ejemplo.cl"
          className={inputClass('emailCliente')}
        />
        {fieldError('emailCliente')}
      </div>

      {/* Origen */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Origen
        </label>
        <input
          type="text"
          {...register('origen', { required: 'Origen es requerido' })}
          placeholder="Ej: Santiago, Chile"
          className={inputClass('origen')}
        />
        {fieldError('origen')}
      </div>

      {/* Destino */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Destino
        </label>
        <input
          type="text"
          {...register('destino', { required: 'Destino es requerido' })}
          placeholder="Ej: Madrid, España"
          className={inputClass('destino')}
        />
        {fieldError('destino')}
      </div>

      {/* Tipo de Viaje */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de Viaje
        </label>
        <select
          {...register('tipoViaje')}
          className={inputClass('tipoViaje')}
        >
          <option value="negocios">Negocios</option>
          <option value="turismo">Turismo</option>
          <option value="otros">Otros</option>
        </select>
        {fieldError('tipoViaje')}
      </div>

      {/* Fecha Salida */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fecha de Salida
        </label>
        <input
          type="datetime-local"
          {...register('fechaSalida', { required: 'Fecha de salida es requerida' })}
          className={inputClass('fechaSalida')}
        />
        {fieldError('fechaSalida')}
      </div>

      {/* Fecha Regreso */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fecha de Regreso
        </label>
        <input
          type="datetime-local"
          {...register('fechaRegreso', {
            required: 'Fecha de regreso es requerida',
            validate: (value) => {
              const salida = watch('fechaSalida');
              if (salida && value && new Date(value) <= new Date(salida)) {
                return 'La fecha de regreso debe ser posterior a la de salida';
              }
              return true;
            },
          })}
          className={inputClass('fechaRegreso')}
        />
        {fieldError('fechaRegreso')}
      </div>

      {/* Fecha Registro */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fecha de Registro
        </label>
        <input
          type="text"
          disabled
          value="Se registrará automáticamente"
          className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-500"
        />
      </div>

      {/* Estado */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Estado
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" value="pendiente" {...register('estado')} className="text-blue-600" />
            <span className="text-sm">Pendiente</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" value="en proceso" {...register('estado')} className="text-blue-600" />
            <span className="text-sm">En Proceso</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" value="finalizada" {...register('estado')} className="text-blue-600" />
            <span className="text-sm">Finalizada</span>
          </label>
        </div>
        {fieldError('estado')}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {submitting ? 'Enviando...' : 'Registrar Solicitud'}
      </button>
    </form>
  );
}
