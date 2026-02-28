import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import I18nProvider from '@/components/I18nProvider';
import HtmlLangSync from '@/components/HtmlLangSync';

export const metadata: Metadata = {
  title: 'Agencia de Viajes Oeste - Solicitudes',
  description: 'Sistema de registro y listado de solicitudes de viaje',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <I18nProvider>
          <HtmlLangSync />
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
        </I18nProvider>
      </body>
    </html>
  );
}
