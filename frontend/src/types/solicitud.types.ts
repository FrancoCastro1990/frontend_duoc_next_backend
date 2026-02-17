export type EstadoSolicitud = 'pendiente' | 'en proceso' | 'finalizada';
export type TipoViaje = 'negocios' | 'turismo' | 'otros';

export interface Solicitud {
  id: number;
  dni: string;
  nombreCliente: string;
  emailCliente: string;
  origen: string;
  destino: string;
  tipoViaje: TipoViaje;
  fechaSalida: string;
  fechaRegreso: string;
  fechaRegistro: string;
  estado: EstadoSolicitud;
}

export interface Cliente {
  dni: string;
  nombre: string;
  email: string;
}

export interface SolicitudFormData {
  dni: string;
  nombreCliente: string;
  emailCliente: string;
  origen: string;
  destino: string;
  tipoViaje: TipoViaje;
  fechaSalida: string;
  fechaRegreso: string;
  estado: EstadoSolicitud;
}
