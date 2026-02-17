import SolicitudForm from '@/components/SolicitudForm';

export default function NuevaSolicitudPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Nueva Solicitud de Viaje</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <SolicitudForm />
      </div>
    </div>
  );
}
