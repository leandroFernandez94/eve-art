import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Acuarelas - Portfolio de Arte en Acuarela',
  description: 'Portfolio de una artista especializada en acuarelas. Explora colecciones únicas de arte en acuarela, desde paisajes hasta retratos.',
  keywords: ['acuarela', 'arte', 'pintura', 'portfolio', 'artista', 'watercolor'],
  authors: [{ name: 'Acuarelas' }],
  openGraph: {
    title: 'Acuarelas - Portfolio de Arte en Acuarela',
    description: 'Portfolio de una artista especializada en acuarelas.',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
