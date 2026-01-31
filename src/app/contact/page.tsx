import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contacto - Acuarelas',
  description: 'Ponte en contacto para consultas, comisiones personalizadas o información sobre las obras disponibles.',
};

interface ContactPageProps {
  searchParams: { artwork?: string };
}

export default function ContactPage({ searchParams }: ContactPageProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="watercolor-texture py-16">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-serif font-bold text-watercolor-900 mb-4">
            Contacto
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            ¿Tienes una pregunta o te interesa una obra? Me encantaría saber de ti
          </p>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <div className="card p-8">
              <h2 className="text-2xl font-serif font-bold text-watercolor-900 mb-6">
                Envíame un mensaje
              </h2>
              <ContactForm artworkSlug={searchParams.artwork} />
            </div>
          </div>

          {/* Contact Info */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Info Card */}
            <div className="card p-8">
              <h2 className="text-2xl font-serif font-bold text-watercolor-900 mb-6">
                Información de Contacto
              </h2>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-watercolor-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-watercolor-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                    <a href="mailto:info@acuarelas.com" className="text-sage-600 hover:text-sage-700">
                      info@acuarelas.com
                    </a>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-watercolor-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-watercolor-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Tiempo de Respuesta</h3>
                    <p className="text-gray-600">Generalmente respondo en 24-48 horas</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-watercolor-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-watercolor-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Redes Sociales</h3>
                    <div className="space-y-1">
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="block text-sage-600 hover:text-sage-700">
                        Instagram
                      </a>
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="block text-sage-600 hover:text-sage-700">
                        Facebook
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="card p-8">
              <h3 className="text-xl font-serif font-bold text-watercolor-900 mb-4">
                Preguntas Frecuentes
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-watercolor-600 mr-2">•</span>
                  <span>Todas las obras vienen con certificado de autenticidad</span>
                </li>
                <li className="flex items-start">
                  <span className="text-watercolor-600 mr-2">•</span>
                  <span>Envíos seguros a todo el mundo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-watercolor-600 mr-2">•</span>
                  <span>Acepto comisiones personalizadas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-watercolor-600 mr-2">•</span>
                  <span>Las obras se envían sin marco (salvo especificación)</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-sage-700 to-sage-900 text-white rounded-xl p-8">
              <h3 className="text-2xl font-serif font-bold mb-3">
                ¿Prefieres llamar?
              </h3>
              <p className="text-sage-100 mb-4">
                Por el momento, prefiero la comunicación por email para poder 
                compartir imágenes y detalles de las obras fácilmente.
              </p>
              <p className="text-sage-200 text-sm">
                Si tienes alguna necesidad especial, menciónalo en tu mensaje 
                y encontraremos la mejor forma de comunicarnos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
