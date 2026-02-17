import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/solicitudes" className="text-xl font-bold">
          Agencia de Viajes Oeste
        </Link>
        <div className="flex gap-4">
          <Link
            href="/solicitudes"
            className="hover:bg-blue-700 px-3 py-2 rounded transition-colors"
          >
            Solicitudes
          </Link>
          <Link
            href="/solicitudes/nueva"
            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition-colors"
          >
            Nueva Solicitud
          </Link>
        </div>
      </div>
    </nav>
  );
}
