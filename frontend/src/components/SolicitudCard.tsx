import { Solicitud } from '@/types/solicitud.types';

const estadoBadge: Record<string, string> = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  'en proceso': 'bg-blue-100 text-blue-800',
  finalizada: 'bg-green-100 text-green-800',
};

const tipoLabel: Record<string, string> = {
  negocios: 'Negocios',
  turismo: 'Turismo',
  otros: 'Otros',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function SolicitudCard({ solicitud }: { solicitud: Solicitud }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            #{solicitud.id} - {solicitud.nombreCliente}
          </h3>
          <p className="text-sm text-gray-500">DNI: {solicitud.dni}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${estadoBadge[solicitud.estado]}`}
        >
          {solicitud.estado}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mb-3">
        <div>
          <span className="font-medium">Origen:</span> {solicitud.origen}
        </div>
        <div>
          <span className="font-medium">Destino:</span> {solicitud.destino}
        </div>
        <div>
          <span className="font-medium">Salida:</span>{' '}
          {formatDate(solicitud.fechaSalida)}
        </div>
        <div>
          <span className="font-medium">Regreso:</span>{' '}
          {formatDate(solicitud.fechaRegreso)}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-3">
        <span className="text-gray-500">
          Tipo: <span className="font-medium">{tipoLabel[solicitud.tipoViaje]}</span>
        </span>
        <span className="text-gray-500">
          Email: {solicitud.emailCliente}
        </span>
      </div>

      <p className="text-xs text-gray-400 mt-2">
        Registrado: {formatDate(solicitud.fechaRegistro)}
      </p>
    </div>
  );
}
